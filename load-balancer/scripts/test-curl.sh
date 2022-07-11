curl -X POST http://localhost/rpc/binance \
    -H "Content-Type: application/json" --insecure \
    --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}'