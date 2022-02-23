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
app.use('/ont-testnet/', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'https://polaris1.ont.io:10339/',
    changeOrigin: true,
    pathRewrite: {
        [`^/ont-testnet`]: ''
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
module.exports = {
    app,
};
//# sourceMappingURL=app.js.map