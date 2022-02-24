import { Response } from 'express';
import fetch, { RequestInit } from 'node-fetch';
import { getNodeUrl } from '../Utils/Blockchain';
import {
  createHeaderFilter,
  normalizeNodeFetchHeaders,
  requestShouldHaveBody
} from '../Utils/Requests';

// Define constants
const MAX_RETRIES: number = 5;

const getNodeHeaders = createHeaderFilter((header) =>
  ['content-type', 'authorization'].includes(header.toLowerCase())
);
const getProxyResponseHeaders = createHeaderFilter((header) =>
  ['content-type'].includes(header.toLowerCase())
);

// Handles proxy requests
export const handler = async (req: any, res: Response): Promise<void> => {
  try {
    req.retries = req.retries || 0;
    req.current = req.current || 0;

    const reqOptions = buildNodeRequestOptions(req);
    const path = req.originalUrl.replace(`/${req.params.blockchain}`, '');
    const server = getNodeUrl({
      blockchain: req.params.blockchain,
      net: req.query.net,
      nodeIndex: req.current,
      path
    });
    const destinationUrl = `${server}${path}`;

    const nodeRes = await fetch(destinationUrl, reqOptions);
    if (!nodeRes.ok) {
      throw nodeRes;
    }
    const data = await nodeRes.text();
    const headers = normalizeNodeFetchHeaders(nodeRes);
    res.set(getProxyResponseHeaders(headers)).status(nodeRes.status).send(data);
  } catch (err) {
    if (isRetriable(err, req)) {
      req.retries++;
      req.current++;
      return handler(req, res);
    }
    res.end(`${err}`);
  }
};
function buildNodeRequestOptions(req: any): RequestInit {
  const reqOptions: RequestInit = {
    method: req.method,
    headers: getNodeHeaders(req.headers)
  };

  if (requestShouldHaveBody(req)) {
    reqOptions.body = JSON.stringify(req.body);
  }
  return reqOptions;
}

function isRetriable(error: any, req: any) {
  return req.retries < MAX_RETRIES;
}
