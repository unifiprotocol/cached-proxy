import { Request } from 'express';
import { Response as NodeFetchResponse } from 'node-fetch';

export const createHeaderFilter =
  (filter: (header: string, value: string) => boolean) =>
  (reqHeaders: Record<string, string>): Record<string, string> => {
    return Object.entries(reqHeaders).reduce((headers, [header, value]) => {
      if (!filter(header, value)) {
        return headers;
      }
      return {
        ...headers,
        [header]: value
      };
    }, {});
  };

export const requestShouldHaveBody = (req: Request) => {
  return !['GET', 'HEAD'].includes(req.method) && req.body;
};

export const normalizeNodeFetchHeaders = (
  response: NodeFetchResponse
): Record<string, string> => {
  return Object.entries(response.headers.raw()).reduce((headers, entry) => {
    return { ...headers, [entry[0]]: entry[1].join(';') };
  }, {});
};

export const isNodeFetchResponseError = (err: any) =>
  err && err?.constructor === NodeFetchResponse;

export const concatBaseUrlAndPath = (url: string, path: string) => {
  path = removeTrailingSlash(path);
  url = removeTrailingSlash(url);
  if (path.startsWith('/')) {
    path = path.substring(1, url.length);
  }
  return `${url}/${path}`;
};

const removeTrailingSlash = (str: string) => {
  if (str.length > 0 && str[str.length - 1] === '/') {
    return str.substring(0, str.length - 1);
  }
  return str;
};
