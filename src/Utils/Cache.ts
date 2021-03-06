import apiCache from 'apicache';

export function cacheMiddleware(cacheDuration?: number) {
  const cacheOptions = {
    statusCodes: { include: [200] },
    appendKey: (req: Request) => req.method
  };
  return apiCache.options(cacheOptions).middleware(cacheDuration);
}
