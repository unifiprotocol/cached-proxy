import {
  MAINNET_NODES as BINANCE_MAINNET_NODES,
  TESTNET_NODES as BINANCE_TESTNET_NODES
} from './nodes/binance';
import { MAINNET_NODES as ETHEREUM_MAINNET_NODES } from './nodes/ethereum';
import {
  MAINNET_NODES as HARMONY_MAINNET_NODES,
  TESTNET_NODES as HARMONY_TESTNET_NODES
} from './nodes/harmony';
import {
  MAINNET_NODES as FANTOM_MAINNET_NODES,
  TESTNET_NODES as FANTOM_TESTNET_NODES
} from './nodes/fantom';
import {
  MAINNET_NODES as POLYGON_MAINNET_NODES,
  TESTNET_NODES as POLYGON_TESTNET_NODES
} from './nodes/polygon';
import {
  MAINNET_NODES as IOTEX_MAINNET_NODES,
  TESTNET_NODES as IOTEX_TESTNET_NODES
} from './nodes/iotex';
import {
  MAINNET_NODES as AVALANCHE_MAINNET_NODES,
  TESTNET_NODES as AVALANCHE_TESTNET_NODES
} from './nodes/avalanche';
import {
  MAINNET_NODES as BITTORRENT_MAINNET_NODES,
  TESTNET_NODES as BITTORRENT_TESTNET_NODES
} from './nodes/bittorrent';
import {
  MAINNET_NODES as ONTOLOGY_MAINNET_NODES,
  TESTNET_NODES as ONTOLOGY_TESTNET_NODES
} from './nodes/ontology';
import {
  MAINNET_NODES as TRON_MAINNET_NODES,
  TESTNET_NODES as TRON_TESTNET_NODES
} from './nodes/tron';
import {
  MAINNET_NODES as ICON_MAINNET_NODES,
  TESTNET_NODES as ICON_TESTNET_NODES
} from './nodes/icon';
import { Blockchains } from '@unifiprotocol/utils';

export const NODES: any = {
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
    mainnet: TRON_MAINNET_NODES,
    testnet: TRON_TESTNET_NODES
  },
  icon: {
    mainnet: ICON_MAINNET_NODES,
    testnet: ICON_TESTNET_NODES
  }
};

export const getNodes = (_blockchain: string, _net = 'mainnet'): string[] => {
  const { blockchain, net } = normalizeBlockchainAndNetwork(
    _blockchain.toLowerCase(),
    _net.toLowerCase()
  );

  if (!NODES[blockchain]) {
    throw new Error(`Blockchain ${blockchain} does not exist.`);
  }
  if (!NODES[blockchain][net]) {
    throw new Error(`Unknown network ${net} for ${blockchain}.`);
  }

  return NODES[blockchain][net];
};

function normalizeBlockchainAndNetwork(blockchain: string, net: string) {
  switch (blockchain) {
    case Blockchains.OntologyTestnet.toLowerCase():
      return { blockchain: 'ontology', net: 'testnet' };
    case Blockchains.EthereumRinkeby.toLowerCase():
      return { blockchain: 'ethereum', net: 'rinkeby' };
    case Blockchains.EthereumRopsten.toLowerCase():
      return { blockchain: 'ethereum', net: 'ropsten' };
    case Blockchains.BinanceTestnet.toLowerCase():
      return { blockchain: 'binance', net: 'testnet' };
    case Blockchains.BTTC.toLowerCase():
      return { blockchain: 'bittorrent', net: 'mainnet' };
    case Blockchains.FTM.toLowerCase():
      return { blockchain: 'fantom', net: 'mainnet' };
  }

  return { blockchain, net };
}
