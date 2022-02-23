import { NODES } from '../config';

export const getNodes = (
  blockchain: string,
  net: string,
  path: string
): string[] => {
  let subset = net;
  if (blockchain === 'tron' && path.indexOf('event/') >= 0) {
    subset += '_event';
  }
  if (!NODES[blockchain]) {
    throw new Error(`Blockchain ${blockchain} does not exist.`);
  }
  if (!NODES[blockchain][subset]) {
    throw new Error(`Unknown network ${net} for ${blockchain}.`);
  }

  return NODES[blockchain][subset];
};
