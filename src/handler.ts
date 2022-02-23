import { Response } from 'express';
import fetch, { RequestInit, Response as FetchResponse } from 'node-fetch';
import { getNodes } from './config';

type Url = string;

// Define constants
const MAX_RETRIES: number = 5;

// Handles proxy requests
export const handler = async (req: any, res: Response) => {
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
      headers: headers
    };

    if (!['GET', 'HEAD'].includes(method) && body) {
      reqOptions.body = JSON.stringify(body);
    }

    const desiredPath = originalUrl.replace(`/${req.params.blockchain}`, '');
    const destinationUrl = `${server}${desiredPath}`;

    const response = await fetch(destinationUrl, reqOptions);
    handleProxyResponse(response, res);
  } catch (err) {
    // Retry, x amount of times.
    req.retries++;
    req.current++;

    if (req.retries < MAX_RETRIES) {
      handler(req, res);
    } else {
      // After x amount of times
      // Send back the error message
      res.end(`${err}`);
    }
  }
};

function extractNodeResponseHeaders(response: FetchResponse) {
  return Object.entries(response.headers.raw()).reduce((headers, entry) => {
    return { ...headers, [entry[0]]: entry[1].join(';') };
  }, {});
}

async function handleProxyResponse(nodeResponse: FetchResponse, res: Response) {
  if (!nodeResponse.ok) {
    throw new Error('Error on the request');
  }
  const data = await nodeResponse.text();
  const headers = extractNodeResponseHeaders(nodeResponse);
  // Send response data back to original caller
  res.set(headers).status(nodeResponse.status).send(data);
}
