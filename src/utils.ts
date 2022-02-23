import { normalizeBlockchainAndNetwork } from './Utils/Blockchains';
import { getNodes } from './Utils/Nodes';

interface GetNodeUrlArgs {
  blockchain: string;
  net: string;
  nodeIndex: number;
  path: string;
}

export const getNodeUrl = ({
  blockchain: _blockchain,
  net: _net,
  nodeIndex,
  path
}: GetNodeUrlArgs) => {
  const { blockchain, net } = normalizeBlockchainAndNetwork(_blockchain, _net);
  const blockchainNodes: Array<string> = getNodes(blockchain, net, path);

  // Select server
  return blockchainNodes[nodeIndex] !== undefined
    ? blockchainNodes[nodeIndex]
    : blockchainNodes[0];
};
