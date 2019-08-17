const http = require('http');
const path = require('path');
const config = require('./config/config.js');
const router = require('./route/router.js');

let server = http.createServer(function (req, res) {
  if (req.url.indexOf('/static') > -1) {
    const filePath = path.join(config.root, req.url);
    console.log(req.url, filePath);
    router['/static'](req, res, filePath);
  } else if (req.url.indexOf('/api') > -1) {
    console.log('--api', req.url, req.headers, req.body);
  }
});

server.listen(config.port, config.hostname, () => {
  console.log('listening in: ', config.hostname, config.port);
});