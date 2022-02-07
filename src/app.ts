import cors from 'cors'
import express, { Request } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import apiCache from 'apicache'
import morgan from 'morgan'

const app = express()
app.use(cors())
app.use(morgan('combined'))

// Avalanche Mainnet
app.use(
  '/avalanche-mainnet/',
  createProxyMiddleware({
    target: 'https://api.avax.network/ext/bc/C/rpc', 
    changeOrigin: true,
    pathRewrite: {
      [`^/avalanche-mainnet`]: ''
    }
  })
)

// Avalanche Testnet
app.use(
  '/avalanche-testnet/',
  createProxyMiddleware({
    target: 'https://api.avax-test.network/ext/bc/C/rpc', 
    changeOrigin: true,
    pathRewrite: {
      [`^/avalanche-testnet`]: ''
    }
  })
)

// BitTorrent Mainnet
app.use(
  '/bittorrent-mainnet/',
  createProxyMiddleware({
    target: 'https://rpc.bt.io',
    changeOrigin: true,
    pathRewrite: {
      [`^/bittorrent-mainnet`]: ''
    }
  })
)

// BitTorrent Testnet
app.use(
  '/bittorrent-testnet/',
  createProxyMiddleware({
    target: 'https://pre-rpc.bt.io/',
    changeOrigin: true,
    pathRewrite: {
      [`^/bittorrent-testnet`]: ''
    }
  })
)

// Binance Smart Chain Mainnet
app.use(
  '/binance-mainnet/',
  createProxyMiddleware({
    target: 'https://bsc-dataseed.binance.org/', 
    changeOrigin: true,
    pathRewrite: {
      [`^/binance-mainnet`]: ''
    }
  })
)

// Binance Smart Chain Testnet
app.use(
  '/binance-testnet/',
  createProxyMiddleware({
    target: 'https://data-seed-prebsc-1-s1.binance.org:8545/', 
    changeOrigin: true,
    pathRewrite: {
      [`^/binance-testnet`]: ''
    }
  })
)

// Ethereum Mainnet
app.use(
  '/ethereum-mainnet/',
  createProxyMiddleware({
    target: 'https://cloudflare-eth.com/',
    changeOrigin: true,
    pathRewrite: {
      [`^/ethereum-mainnet`]: ''
    }
  })
)

// Tron Mainnet
app.use(
  '/tron-mainnet/',
  createProxyMiddleware({
    target: 'https://api.trongrid.io/',
    changeOrigin: true,
    pathRewrite: {
      [`^/tron-mainnet`]: ''
    }
  })
)

// IoTeX Mainnet
app.use(
  '/iotex-mainnet/',
  createProxyMiddleware({
    target: 'https://babel-api.mainnet.iotex.io/',
    changeOrigin: true,
    pathRewrite: {
      [`^/iotex-mainnet`]: ''
    }
  })
)

// IoTeX Testnet
app.use(
  '/iotex-testnet/',
  createProxyMiddleware({
    target: 'https://babel-api.testnet.iotex.io',
    changeOrigin: true,
    pathRewrite: {
      [`^/iotex-testnet`]: ''
    }
  })
)

// Harmony Mainnet
app.use(
  '/harmony-mainnet/',
  createProxyMiddleware({
    target: 'https://api.harmony.one/',
    changeOrigin: true,
    pathRewrite: {
      [`^/harmony-mainnet`]: ''
    }
  })
)

// Harmony Testnet
app.use(
  '/harmony-testnet/',
  createProxyMiddleware({
    target: '	https://api.s0.b.hmny.io/',
    changeOrigin: true,
    pathRewrite: {
      [`^/harmony-testnet`]: ''
    }
  })
)

// Polygon Mainnet
app.use(
  '/polygon-mainnet/',
  createProxyMiddleware({
    target: 'https://polygon-rpc.com/',
    changeOrigin: true,
    pathRewrite: {
      [`^/polygon-mainnet`]: ''
    }
  })
)

// Polygon Testnet
app.use(
  '/polygon-testnet/',
  createProxyMiddleware({
    target: 'https://rpc-mumbai.maticvigil.com',
    changeOrigin: true,
    pathRewrite: {
      [`^/polygon-testnet`]: ''
    }
  })
)

// Icon Mainnet
app.use(
  '/icon-mainnet/',
  createProxyMiddleware({
    target: 'https://ctz.solidwallet.io',
    changeOrigin: true,
    pathRewrite: {
      [`^/icon-mainnet`]: ''
    }
  })
)

// Ontology Mainnet
app.use(
  '/ontology-mainnet/',
  createProxyMiddleware({
    target: 'http://dappnode1.ont.io:10334',
    changeOrigin: true,
    pathRewrite: {
      [`^/ontology-mainnet`]: ''
    }
  })
)

// Ontology Testnet
app.use(
  '/ontology-testnet/',
  createProxyMiddleware({
    target: 'https://polaris1.ont.io:10339/',
    changeOrigin: true,
    pathRewrite: {
      [`^/ontology-testnet`]: ''
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

app.use(
  '/metabase/',
  createProxyMiddleware({
    target: 'http://178.62.233.25:3000/',
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
