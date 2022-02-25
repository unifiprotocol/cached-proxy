export type Web3NodeList = string[];

export type TronNodeType = 'eventServer' | 'solidityNode' | 'fullHost';

export type TronNodeList = Record<TronNodeType, string[]>;
