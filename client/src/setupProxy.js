const proxy = require('http-proxy-middleware');
//this is how we setup the two proxies.
module.exports = function(app) {
  app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
  app.use(proxy('/api/*', { target: 'http://localhost:5000/' }));
};
