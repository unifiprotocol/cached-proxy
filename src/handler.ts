import {Response} from "express";
import axios, {AxiosResponse} from "axios";
import {NODES} from "./config";

type Url = string; 
type Blockchain = string;
type Net = string;

// Define constants
const MAX_RETRIES: number = 5;
const RESPONSE_SUCCESS_STATUS: number = 200; 

// Handles proxy requests
export const handler = async (req: any, res: Response) => {
  req.current = req.current ? req.current : 0;

  // Destructure props from request object
  const { method, url, headers, body } = req;

  /* 
  Read parameters
  Blockchain is required, net defaults to mainnet if not provided
  */

  const blockchain: Blockchain = req.params.blockchain.toLowerCase(); 
  const net: Net = req.query.net ? req.query.net.toLowerCase() : "mainnet"; // Default to mainnet

  const blockchainNodes: Array<string> = NODES[blockchain][net];

  // Select server
  const server: Url = blockchainNodes[req.current] !== undefined ? blockchainNodes[req.current] : blockchainNodes[0];

	try {
    // Do request
    const response: AxiosResponse = await axios({
      url: `${server}${url.replace(`/${req.params.blockchain}`, '')}`,
      method: method,
      // headers: headers, /* TODO: ERR_TLS_CERT_ALTNAME_INVALID */
      data: body,
    });

    // Send response data back to original caller
    if (response.status === RESPONSE_SUCCESS_STATUS) {
      res.send(response.data);
    }
  }
  catch (err) {
    // Retry, x amount of times.
		req.retries ? req.retries++ : req.retries = 1;
    req.current++;

		if (req.retries < MAX_RETRIES) { 
      handler(req, res);
    } else { // After x amount of times
      // Send back the error message
      res.status(500).end(`${err}`);   
    }
  }
}