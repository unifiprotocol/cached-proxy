import { Request, Response } from 'express';
import fetch, { RequestInit, Response as FetchResponse } from 'node-fetch';
import { getNodes } from './config';

type Url = string;

// Define constants
const MAX_RETRIES: number = 5;

const getNodeHeaders = headerFilters((header) =>
  ['content-type', 'authorization'].includes(header.toLowerCase())
);
const getProxyResponseHeaders = headerFilters((header) =>
  ['content-type'].includes(header.toLowerCase())
);

// Handles proxy requests
export const handler = async (req: any, res: Response): Promise<void> => {
  req.retries = req.retries || 0;
  req.current = req.current || 0;

  // Destructure props from request object
  const { method, originalUrl, headers, body } = req;

  /* 
  Read parameters
  Blockchain is required, net defaults to mainnet if not provided
  */

  const blockchainNodes: Array<string> = getNodes(
    req.params.blockchain,
    req.query.net
  );

  // Select server
  const server: Url =
    blockchainNodes[req.current] !== undefined
      ? blockchainNodes[req.current]
      : blockchainNodes[0];

  try {
    // Do request
    const reqOptions: RequestInit = {
      method: method,
      headers: getNodeHeaders(headers)
    };

    if (!['GET', 'HEAD'].includes(method) && body) {
      reqOptions.body = JSON.stringify(body);
    }

    const desiredPath = originalUrl.replace(`/${req.params.blockchain}`, '');
    const destinationUrl = `${server}${desiredPath}`;

    const nodeRes = await fetch(destinationUrl, reqOptions);
    await handleProxyResponse(nodeRes, res);
  } catch (err) {
    if (isRetriable(err, req)) {
      req.retries++;
      req.current++;
      return handler(req, res);
    }
    res.end(`${err}`);
  }
};

function normalizeNodeFetchHeaders(response: FetchResponse) {
  return Object.entries(response.headers.raw()).reduce((headers, entry) => {
    return { ...headers, [entry[0]]: entry[1].join(';') };
  }, {});
}

async function handleProxyResponse(nodeRes: FetchResponse, res: Response) {
  if (!nodeRes.ok) {
    throw nodeRes;
  }
  const data = await nodeRes.text();
  const headers = normalizeNodeFetchHeaders(nodeRes);
  res.set(getProxyResponseHeaders(headers)).status(nodeRes.status).send(data);
}

function isRetriable(error: any, req: any) {
  return req.retries < MAX_RETRIES;
}

function headerFilters(filter: (header: string, value: string) => boolean) {
  return function (reqHeaders: Record<string, string>): Record<string, string> {
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
}
