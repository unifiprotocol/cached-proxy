import fetch from 'node-fetch';
import { NODES as blockchainNodes } from './config';

export function sortListByBlocks() {
  // Sorts node list by blockheight
  Object.entries(blockchainNodes).forEach(async (blockchain: Array<any>) => {
    const mainnetNodes = blockchain[1].mainnet;

    const nodes = Promise.all(
      mainnetNodes.map(async (node: string) => {
        try {
          const response = await getBlockHeight(node);
          const data = await response.json();

          return {
            node: node,
            blockHeight: parseInt(data.result)
          };
        } catch (e) {
          // For incorrect node response. Pass 0
          return { node: node, blockHeight: 0 };
        }
      })
    );

    nodes.then((data) => {
      let sorted = data.sort(function (a: any, b: any) {
        return a.blockHeight < b.blockHeight ? -1 : 1;
      });

      const newSortedNodes = sorted
        .reverse()
        .map((nodeData: any) => nodeData.node);

      // Set mainnet to new sorted list
      blockchain[1].mainnet = newSortedNodes;
    });
  });
}

function getBlockHeight(url: string) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_blockNumber',
      params: [],
      id: 83
    })
  });
}
