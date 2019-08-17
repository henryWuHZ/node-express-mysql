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

server.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", config.origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
  next();
});

server.listen(config.port, config.hostname, () => {
  console.log('listening in: ', config.hostname, config.port);
});