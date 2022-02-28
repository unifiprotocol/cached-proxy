import { Response } from 'express';
import fetch, { RequestInit, Response as NodeFetchResponse } from 'node-fetch';

import { getNodeUrl } from '../Utils/Blockchain';
import {
  createHeaderFilter,
  isNodeFetchResponseError,
  normalizeNodeFetchHeaders,
  requestShouldHaveBody,
  concatBaseUrlAndPath
} from '../Utils/Requests';

// Define constants
const MAX_RETRIES: number = 5;

const getNodeHeaders = createHeaderFilter((header) =>
  ['content-type', 'authorization', 'accept'].includes(header.toLowerCase())
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
    const path = req.params[0] || '/';
    const server = getNodeUrl({
      blockchain: req.params.blockchain,
      net: req.query.net,
      nodeIndex: req.current,
      path
    });

    const destinationUrl = concatBaseUrlAndPath(server, path);
    const nodeRes = await fetch(destinationUrl, reqOptions);

    if (!nodeRes.ok) {
      throw nodeRes;
    }
    const data = await nodeRes.text();
    const headers = normalizeNodeFetchHeaders(nodeRes);

    res.set(getProxyResponseHeaders(headers)).status(nodeRes.status).send(data);
  } catch (error) {
    console.error(error);
    if (isRetriable(error, req)) {
      req.retries++;
      req.current++;
      return handler(req, res);
    }
    handleErrorResponse(error, res);
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

function isRetriable(error: any, originalReq: any) {
  let conditions = [originalReq.retries < MAX_RETRIES];
  if (!isNodeFetchResponseError(error)) {
    // non response errors means a code error
    return false;
  }

  const nonRetriableStatusCodes = [404];
  conditions.push(!nonRetriableStatusCodes.includes(error.status));

  return !conditions.some((passed) => !passed);
}

async function handleErrorResponse(err: any, res: Response) {
  if (isNodeFetchResponseError(err)) {
    const error: NodeFetchResponse = err;
    return res.sendStatus(error.status);
  }
  res.status(500).send();
}
