import axios, { AxiosResponse } from "axios";
import {NODES as blockchainNodes} from "./config";

export function sortListByBlocks() {
    // Sorts node list by blockheight
    Object.entries(blockchainNodes).forEach(async (blockchain: Array<any>) => {
        const mainnetNodes = blockchain[1].mainnet;

        const nodes = Promise.all(mainnetNodes.map(async (node: any) => {
            try {
                const response = await getBlockHeight(node);

                return {
                    node: node,
                    blockHeight: parseInt(response.data.result)
                }
            } catch (e) {
                // For incorrect node response. Pass 0 
                return { node: node, blockHeight: 0 };
            }
        }))

        nodes.then((data) => {
            let sorted = data.sort(function (a: any, b: any) {
                return (a.blockHeight < b.blockHeight) ? - 1 : 1;
            });
            
            let newSortedNodes = sorted.reverse().map((nodeData: any) => nodeData.node);
            
            // Set mainnet to new sorted list
            blockchain[1].mainnet = newSortedNodes;
        })
    })
}


function getBlockHeight(url: string): Promise<AxiosResponse> {
    return axios.post(url, { 
        jsonrpc: "2.0", 
        method: "eth_blockNumber",  
        params: [],  
        id: 83 
    });
}
