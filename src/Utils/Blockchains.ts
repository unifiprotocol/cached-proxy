import { Blockchains } from '@unifiprotocol/utils';

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
      return { blockchain: 'binance', net: 'testnet' };
    case Blockchains.BTTC.toLowerCase():
      return { blockchain: 'bittorrent', net: 'mainnet' };
    case Blockchains.FTM.toLowerCase():
      return { blockchain: 'fantom', net: 'mainnet' };
  }

  return { blockchain, net };
}
