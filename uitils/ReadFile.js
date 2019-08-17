const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);//stat方法promise化
const readdir = promisify(fs.readdir);
const mime = require('mime');

//根据请求url来获取被请求文件的后缀
let getFileType = function (url) {
  //获取.在url中的下标位置
  var index = url.lastIndexOf('.');
  if (index >= 0) {
    //如果有后缀名则返回后缀名
    return url.substring(index + 1, url.legnth);
  } else {
    //没有后缀名则返回 html
    return 'false';
  }
}
//根据后缀名来设置文档类型
function setFileType(fileType, res) {
  if (fileType == 'jpg' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'png') {
    res.setHeader('Content-Type', 'image/png');
  } else if (fileType == 'css') {
    res.setHeader('Content-Type', 'text/css');
  } else if (fileType == 'js') {
    res.setHeader('Content-Type', 'application/x-javascript');
  } else {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
  }
}

module.exports = async function (req, res, filePath) {
  let fileType = mime.getType(req.url);
  console.log(fileType, 'fileType');
  try {
    if (!fileType) {
      throw new Error()
    } else {
      const stat1 = await stat(filePath);
      if (stat1.isFile()) {
        res.setHeader('Content-Type', fileType);
        fs.createReadStream(filePath).pipe(res)
      } else if (stat1.isDirectory()) {
        const files = await readdir(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(files.join(','));
      }
    }
  } catch (error) {
    console.log(error);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/javascript;charset=UTF-8;');
    res.end(`${filePath} is not a directory or file.`)
    return;
  }
}