import { Blockchains } from '@unifiprotocol/utils';
import { Web3NodeList } from '../Blockchain/Types';
import { NODES } from '../Blockchain';
import { getTronNodes } from '../Blockchain/tron';

export const getNodes = (
  blockchain: keyof typeof NODES,
  net: string,
  path: string
): string[] => {
  if (!NODES[blockchain]) {
    throw new Error(`Blockchain ${blockchain} does not exist.`);
  }
  if (!NODES[blockchain][net]) {
    throw new Error(`Unknown network ${net} for ${blockchain}.`);
  }

  if (blockchain === 'tron') {
    return getTronNodes(net, path);
  }

  return NODES[blockchain][net] as Web3NodeList;
};

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

export function normalizeBlockchainAndNetwork(
  _blockchain: string,
  _net: string
) {
  const blockchain = _blockchain.toLowerCase();
  const net = _net ? _net.toLowerCase() : 'mainnet';
  switch (blockchain) {
    case Blockchains.OntologyTestnet.toLowerCase():
      return { blockchain: 'ontology', net: 'testnet' };
    case Blockchains.EthereumRinkeby.toLowerCase():
      return { blockchain: 'ethereum', net: 'rinkeby' };
    case Blockchains.EthereumRopsten.toLowerCase():
      return { blockchain: 'ethereum', net: 'ropsten' };
    case Blockchains.BinanceTestnet.toLowerCase():
    case 'BinanceTesnet'.toLowerCase(): //retro compatibility in case somewhere is being used
      return { blockchain: 'binance', net: 'testnet' };
    case Blockchains.BTTC.toLowerCase():
      return { blockchain: 'bittorrent', net: 'mainnet' };
    case Blockchains.FTM.toLowerCase():
      return { blockchain: 'fantom', net: 'mainnet' };
  }

  return { blockchain, net };
}
