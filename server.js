const http = require('http');
const path = require('path');
const config = require('./config/config.js');
const router = require('./route/router.js');

function setHeader(res) {
  res.setHeader("Access-Control-Allow-Origin", config.origin);
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization");
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
}

let server = http.createServer(function (req, res) {
  setHeader(res);
  // console.log(res);
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