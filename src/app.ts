import cors from 'cors'
import express, { Request } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import apiCache from 'apicache'
import morgan from 'morgan'

const app = express()
app.use(cors())
app.use(morgan('combined'))

app.use(
  '/ont-testnet/',
  createProxyMiddleware({
    target: 'https://polaris1.ont.io:10339/',
    changeOrigin: true,
    pathRewrite: {
      [`^/ont-testnet`]: ''
    }
  })
)

app.use(
  '/ipfs/',
  cacheMiddleware(),
  createProxyMiddleware({
    target: 'https://cloudflare-ipfs.com/',
    changeOrigin: true
  })
)

const APP_PORT = process.env.PORT || 8080
app.listen(APP_PORT, () => {
  console.log(`Reverse proxy started on ${APP_PORT}`)
})

function cacheMiddleware() {
  const cacheOptions = {
    statusCodes: { include: [200] },
    appendKey: (req: Request) => req.method
  }
  return apiCache.options(cacheOptions).middleware()
}
