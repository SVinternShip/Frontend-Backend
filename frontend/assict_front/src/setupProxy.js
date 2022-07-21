const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api',  {
          target: 'https://assict.r-e.kr',
          changeOrigin: true
      })
  )
};