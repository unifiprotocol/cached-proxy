import express from 'express';
import { sortListByBlocks } from './Tasks/blocks';
import { handler } from './Blockchain/handler';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import morgan from 'morgan';
import { cacheMiddleware } from './Utils/Cache';

// API
const app = express();

// Remove the X-Powered-By headers.
app.disable('x-powered-by');
app.use(morgan('dev'));

// Parse JSON bodies
app.use(express.json());
app.use(cors());

// To prevent favicon request going to handler.
app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});

app.use(
  '/ipfs/',
  cacheMiddleware(),
  createProxyMiddleware({
    target: 'https://cloudflare-ipfs.com/',
    changeOrigin: true
  })
);

// deprecated: we should update utrade finance to use the way implemented by the handler {proxyUrl}/OntologyTestnet
app.use(
  '/ont-testnet/',
  createProxyMiddleware({
    target: 'https://polaris1.ont.io:10339/',
    changeOrigin: true,
    pathRewrite: {
      [`^/ont-testnet`]: ''
    }
  })
);

app.use(
  '/metabase/',
  createProxyMiddleware({
    target: 'http://178.62.233.25:3000/',
    changeOrigin: true
  })
);

app.use('/rpc/:blockchain*', handler);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`cached-proxy running on port ${PORT}`);
});

// JOBS
const SORT_DELAY_IN_MINUTES = 2 * 60 * 1000; // 2 minutes

setInterval(() => {
  // Sort nodes by blocks
  sortListByBlocks();
}, SORT_DELAY_IN_MINUTES);

sortListByBlocks();
