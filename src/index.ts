import express, { Application } from 'express';
import { sortListByBlocks } from './blocks';
import { handler } from './handler';
import { createProxyMiddleware } from 'http-proxy-middleware';
import apiCache from 'apicache';
import cors from 'cors';

/*
Proxy/Load balancer
*/

const SORT_DELAY_IN_MINUTES: number = 1;

// App port
const port = process.env.PORT || 8080;

const app: Application = express();

// Remove the X-Powered-By headers.
app.disable('x-powered-by');

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

app.use('/:blockchain*', handler);

app.listen(port);

setInterval(() => {
  // Sort nodes by blocks
  sortListByBlocks();
}, SORT_DELAY_IN_MINUTES * 60 * 1000);

sortListByBlocks();

function cacheMiddleware() {
  const cacheOptions = {
    statusCodes: { include: [200] },
    appendKey: (req: Request) => req.method
  };
  return apiCache.options(cacheOptions).middleware();
}
