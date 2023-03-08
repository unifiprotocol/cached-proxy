import {
  MAINNET_NODES as BINANCE_MAINNET_NODES,
  TESTNET_NODES as BINANCE_TESTNET_NODES
} from './binance';
import { MAINNET_NODES as ETHEREUM_MAINNET_NODES } from './ethereum';
import {
  MAINNET_NODES as HARMONY_MAINNET_NODES,
  TESTNET_NODES as HARMONY_TESTNET_NODES
} from './harmony';
import {
  MAINNET_NODES as FANTOM_MAINNET_NODES,
  TESTNET_NODES as FANTOM_TESTNET_NODES
} from './fantom';
import {
  MAINNET_NODES as POLYGON_MAINNET_NODES,
  TESTNET_NODES as POLYGON_TESTNET_NODES
} from './polygon';
import {
  MAINNET_NODES as IOTEX_MAINNET_NODES,
  TESTNET_NODES as IOTEX_TESTNET_NODES
} from './iotex';
import {
  MAINNET_NODES as AVALANCHE_MAINNET_NODES,
  TESTNET_NODES as AVALANCHE_TESTNET_NODES
} from './avalanche';
import {
  MAINNET_NODES as BITTORRENT_MAINNET_NODES,
  TESTNET_NODES as BITTORRENT_TESTNET_NODES
} from './bittorrent';
import {
  MAINNET_NODES as ONTOLOGY_MAINNET_NODES,
  TESTNET_NODES as ONTOLOGY_TESTNET_NODES
} from './ontology';
import { tronMainnet, tronTestnet } from './tron';
import {
  MAINNET_NODES as ICON_MAINNET_NODES,
  TESTNET_NODES as ICON_TESTNET_NODES
} from './icon';
import { TronNodeList, Web3NodeList } from './Types';
import { Blockchains } from '@unifiprotocol/utils';

export const NODES: Record<
  string,
  Record<string, Web3NodeList | TronNodeList>
> = {
  avalanche: {
    mainnet: AVALANCHE_MAINNET_NODES,
    testnet: AVALANCHE_TESTNET_NODES
  },
  bittorrent: {
    mainnet: BITTORRENT_MAINNET_NODES,
    testnet: BITTORRENT_TESTNET_NODES
  },
  binance: {
    mainnet: BINANCE_MAINNET_NODES,
    testnet: BINANCE_TESTNET_NODES
  },
  ethereum: {
    mainnet: ETHEREUM_MAINNET_NODES,
    /* Since Ethereum has different testnets */
    ropsten: ['https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    rinkeby: ['https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    goerli: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    kovan: ['https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161']
  },
  harmony: {
    mainnet: HARMONY_MAINNET_NODES,
    testnet: HARMONY_TESTNET_NODES
  },
  fantom: {
    mainnet: FANTOM_MAINNET_NODES,
    testnet: FANTOM_TESTNET_NODES
  },
  polygon: {
    mainnet: POLYGON_MAINNET_NODES,
    testnet: POLYGON_TESTNET_NODES
  },
  iotex: {
    mainnet: IOTEX_MAINNET_NODES,
    testnet: IOTEX_TESTNET_NODES
  },
  ontology: {
    mainnet: ONTOLOGY_MAINNET_NODES,
    testnet: ONTOLOGY_TESTNET_NODES
  },
  tron: {
    mainnet: tronMainnet,
    testnet: tronTestnet
  },
  icon: {
    mainnet: ICON_MAINNET_NODES,
    testnet: ICON_TESTNET_NODES
  }
};

export const INTERNAL_NODES: Record<
  string,
  { url: string; pathRewrite?: string }
> = {};
