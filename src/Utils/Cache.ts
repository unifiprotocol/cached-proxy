import apiCache from 'apicache';

export function cacheMiddleware() {
  const cacheOptions = {
    statusCodes: { include: [200] },
    appendKey: (req: Request) => req.method
  };
  return apiCache.options(cacheOptions).middleware();
}
