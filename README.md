# cached-proxy

## Endpoints

### /ipfs/:hash

Returns a IPFS file and caches it for a month in a memory storage.

### /:blockchain

MAkes a blockchain call through an [internal list](Blockchain/index.ts) of nodes.

## Examples

Fetch latest block from BSC chain.

```sh
curl -X POST 'http://localhost:8080/binance' \
    -H "Content-Type: application/json" \
    --data '{
    "jsonrpc": "2.0",
    "method": "eth_getBlockByNumber",
    "params": ["latest", true],
    "id": 1
}'
```

```sh
curl -X POST 'https://proxy.unifiprotocol.com/ontology?net=testnet' \
    -H "Content-Type: application/json" \
    --data '{
    "jsonrpc": "2.0",
    "method": "eth_getBlockByNumber",
    "params": ["latest", true],
    "id": 1
}'
```

Fetch a JSON from IPFS

```sh
curl -X POST 'http://localhost:8080/ipfs/QmNrMRrLrjijX7agXL5xAokMLATSLTELnSYSERL9MczXxa' \
    -H "Content-Type: application/json"
```
