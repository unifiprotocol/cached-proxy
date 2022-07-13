import express from 'express';
import { sortListByBlocks } from './Tasks/blocks';
import { handler } from './Blockchain/handler';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import morgan from 'morgan';
import { cacheMiddleware } from './Utils/Cache';
import { INTERNAL_NODES } from './Blockchain';

// API
const app = express();

// Remove the X-Powered-By headers.
app.disable('x-powered-by');
app.use(morgan('dev'));

// Add cors to response
app.use(cors());

// RPC Internal not using express.json() middleware
Object.entries(INTERNAL_NODES).forEach(([blockchain, { url, pathRewrite }]) => {
  app.use(
    `/rpc-internal/${blockchain}/`,
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
      pathRewrite: () => pathRewrite ?? '/'
    })
  );
});

app.use(
  '/darbi/',
  createProxyMiddleware({
    target: 'https://darbi-service-8chxa.ondigitalocean.app/',
    changeOrigin: true,
    pathRewrite: {
      [`^/darbi`]: ''
    }
  })
);

// Parse JSON bodies
app.use(express.json());

// To prevent favicon request going to handler.
app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});

app.use(
  '/ipfs/',
  cacheMiddleware(604800000), // 1w
  createProxyMiddleware({
    target: 'https://cloudflare-ipfs.com/',
    changeOrigin: true
  })
);

app.use(
  '/bridge/',
  cacheMiddleware(15_000), // 15s
  createProxyMiddleware({
    target: 'https://ubridge-service-yqfyt.ondigitalocean.app/',
    changeOrigin: true,
    pathRewrite: {
      [`^/bridge`]: ''
    }
  })
);

app.use(['/rpc/:blockchain/**', '/rpc/:blockchain'], handler);

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
