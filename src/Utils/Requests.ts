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