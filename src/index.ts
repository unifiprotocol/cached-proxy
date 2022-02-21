import express, {Application} from "express";
import cors from "cors";
import { sortListByBlocks } from "./blocks";
import {handler} from "./handler";

/*
Proxy/Load balancer
*/

const SORT_DELAY_IN_MINUTES: number = 1;

// App port
const port = process.env.PORT || 8080 

const app: Application = express()

// Remove the X-Powered-By headers.
app.disable('x-powered-by');  

app.use(cors());

// Parse JSON bodies
app.use(express.json());

// To prevent favicon request going to handler.
app.get('/favicon.ico', function(req, res) { 
  res.sendStatus(204); 
});

// Add handler to GET and POST requests
app.get('/:blockchain*', handler)
app.post('/:blockchain*', handler);

app.listen(port);

setInterval(() => {
  // Sort nodes by blocks
  sortListByBlocks();
}, SORT_DELAY_IN_MINUTES * 60 * 1000)

sortListByBlocks(); 
