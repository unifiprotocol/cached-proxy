"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const apicache_1 = __importDefault(require("apicache"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
// Avalanche Mainnet
app.use('/avalanche-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://api.avax.network/ext/bc/C/rpc',
    changeOrigin: true,
    pathRewrite: {
        [`^/avalanche-mainnet`]: ''
    }
}));
// Avalanche Testnet
app.use('/avalanche-testnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://api.avax-test.network/ext/bc/C/rpc',
    changeOrigin: true,
    pathRewrite: {
        [`^/avalanche-testnet`]: ''
    }
}));
// BitTorrent Mainnet
app.use('/bittorrent-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://rpc.bt.io',
    changeOrigin: true,
    pathRewrite: {
        [`^/bittorrent-mainnet`]: ''
    }
}));
// BitTorrent Testnet
app.use('/bittorrent-testnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://pre-rpc.bt.io/',
    changeOrigin: true,
    pathRewrite: {
        [`^/bittorrent-testnet`]: ''
    }
}));
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
// Ethereum Mainnet
app.use('/ethereum-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://cloudflare-eth.com/',
    changeOrigin: true,
    pathRewrite: {
        [`^/ethereum-mainnet`]: ''
    }
}));
// Tron Mainnet
app.use('/tron-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://api.trongrid.io/',
    changeOrigin: true,
    pathRewrite: {
        [`^/tron-mainnet`]: ''
    }
}));
// IoTeX Mainnet
app.use('/iotex-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://babel-api.mainnet.iotex.io/',
    changeOrigin: true,
    pathRewrite: {
        [`^/iotex-mainnet`]: ''
    }
}));
// IoTeX Testnet
app.use('/iotex-testnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://babel-api.testnet.iotex.io',
    changeOrigin: true,
    pathRewrite: {
        [`^/iotex-testnet`]: ''
    }
}));
// Harmony Mainnet
app.use('/harmony-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://api.harmony.one/',
    changeOrigin: true,
    pathRewrite: {
        [`^/harmony-mainnet`]: ''
    }
}));
// Harmony Testnet
app.use('/harmony-testnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: '	https://api.s0.b.hmny.io/',
    changeOrigin: true,
    pathRewrite: {
        [`^/harmony-testnet`]: ''
    }
}));
// Polygon Mainnet
app.use('/polygon-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://polygon-rpc.com/',
    changeOrigin: true,
    pathRewrite: {
        [`^/polygon-mainnet`]: ''
    }
}));
// Polygon Testnet
app.use('/polygon-testnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://rpc-mumbai.maticvigil.com',
    changeOrigin: true,
    pathRewrite: {
        [`^/polygon-testnet`]: ''
    }
}));
// Icon Mainnet
app.use('/icon-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://ctz.solidwallet.io',
    changeOrigin: true,
    pathRewrite: {
        [`^/icon-mainnet`]: ''
    }
}));
// Ontology Mainnet
app.use('/ontology-mainnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://dappnode1.ont.io:10334',
    changeOrigin: true,
    pathRewrite: {
        [`^/ontology-mainnet`]: ''
    }
}));
// Ontology Testnet
app.use('/ontology-testnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://polaris1.ont.io:10339/',
    changeOrigin: true,
    pathRewrite: {
        [`^/ontology-testnet`]: ''
    }
}));
app.use('/ipfs/', cacheMiddleware(), (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://cloudflare-ipfs.com/',
    changeOrigin: true
}));
app.use('/metabase/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://178.62.233.25:3000/',
    changeOrigin: true
}));
const APP_PORT = process.env.PORT || 8080;
app.listen(APP_PORT, () => {
    console.log(`Reverse proxy started on ${APP_PORT}`);
});
function cacheMiddleware() {
    const cacheOptions = {
        statusCodes: { include: [200] },
        appendKey: (req) => req.method
    };
    return apicache_1.default.options(cacheOptions).middleware();
}
//# sourceMappingURL=app.js.map