import fetch from 'node-fetch';
import { NODES as blockchainNodes } from '../Blockchain';

export function sortListByBlocks() {
  // Sorts node list by blockheight
  Object.entries(blockchainNodes).forEach(async (blockchain) => {
    if (blockchain[0] === 'tron') {
      console.warn('skipping tron nodes order');
      return;
    }

    const mainnetNodes = blockchain[1].mainnet as string[];

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

    nodes.then((data: { blockHeight: number; node: string }[]) => {
      const sorted = data.sort((a, b) => b.blockHeight - a.blockHeight);
      // Set mainnet to new sorted list
      blockchain[1].mainnet = sorted.map((nodeData) => nodeData.node);
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
      id: 1
    })
  });
}
