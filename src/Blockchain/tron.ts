import { TronNodeList, TronNodeType } from './Types';

const nodePort = 8090;
const solidityNodePort = 8091;

const BASE_NODE_MAINNET_NODES: Array<string> = [
  'http://3.225.171.164',
  'http://52.53.189.99',
  'http://18.196.99.16',
  'http://34.253.187.192',
  'http://18.133.82.227',
  'http://35.180.51.163',
  'http://54.252.224.209',
  'http://18.231.27.82',
  'http://52.15.93.92',
  'http://34.220.77.106',
  'http://15.207.144.3',
  'http://13.124.62.58',
  'http://15.222.19.181',
  'http://18.209.42.127',
  'http://3.218.137.187',
  'http://34.237.210.82'
];

export const mainnetFullHost = BASE_NODE_MAINNET_NODES.map(
  (url) => `${url}:${nodePort}`
);
export const mainnetSolidityNode = BASE_NODE_MAINNET_NODES.map(
  (url) => `${url}:${solidityNodePort}`
);

export const mainneteventServer: Array<string> = ['https://api.trongrid.io'];

export const testnetNodes: Array<string> = [];

export const tronMainnet: TronNodeList = {
  fullHost: mainnetFullHost,
  solidityNode: mainnetSolidityNode,
  eventServer: mainneteventServer
};
export const tronTestnet: TronNodeList = {
  fullHost: testnetNodes,
  solidityNode: testnetNodes,
  eventServer: testnetNodes
};

export const getTronNodes = (net: string, path: string): string[] => {
  let type: TronNodeType = 'fullHost';
  if (path.startsWith('event')) {
    type = 'eventServer';
  }
  if (path.startsWith('walletsolidity')) {
    type = 'solidityNode';
  }

  const nodes = net === 'testnet' ? tronTestnet : tronMainnet;
  return nodes[type];
};
