"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_middleware_1 = require("http-proxy-middleware");
const app = require("../app");
// Binance Smart Chain Mainnet
app.use('/binance-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://bsc-dataseed.binance.org/',
    changeOrigin: true,
    pathRewrite: {
        [`^/binance-mainnet`]: ''
    }
}));
// Binance Smart Chain Testnet
app.use('/binance-testnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    changeOrigin: true,
    pathRewrite: {
        [`^/binance-testnet`]: ''
    }
}));
//# sourceMappingURL=binance.js.map