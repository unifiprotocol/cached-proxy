import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

const getRandomWorker = workerRandomFactory();

app.disable('x-powered-by');
app.use(morgan('dev'));
app.use(cors());
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://proxy.unifiprotocol.com/worker',
    router: getRandomWorker,
    changeOrigin: true
  })
);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`cached-proxy running on port ${PORT}`);
});

function workerRandomFactory() {
  const itemsRaw = process.env.WORKER_URLS || '';
  const items: string[] = itemsRaw.split(',').map((url) => url.trim());
  console.log('WORKERS', items);
  return () => items[Math.floor(Math.random() * items.length)];
}
