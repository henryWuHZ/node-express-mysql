let formiadble = require('formidable') // 文件上传
let fs = require('fs-extra')
let path = require('path')
const config = require('../config/config.js');
let uploadDir = path.join(config.root, 'uploads')
let Dbconnection = require('../utils/dbConnect');
let connectDb = new Dbconnection();

function copyFile(src, dest) {
  let promise = new Promise((resolve, reject) => {
    fs.rename(src, dest, err => {
      if (err) {
        reject(err)
      } else {
        resolve('copy file:' + dest + ' success!')
      }
    })
  })
  return promise
}

function saveDB(filename, code) {
  let sql = 'INSERT INTO file (file_name, file_code, update_time, owner_id) VALUES (?, ?, ?, ?)'
  return connectDb.query(sql, [filename, code, new Date(), 1])
}

module.exports = async function (req, res, next) {
  // let tmpPath = path.join(config.root, 'tmp')
  let form = new formiadble.IncomingForm({ uploadDir: uploadDir, keepExtensions: true, maxFieldsSize: 20 * 1024 * 1024 })
  form.parse(req, function (err, fileds, files) {
    console.log('simple-upload:', fileds, files)
    copyFile(files.file.path, path.resolve(uploadDir, fileds.uniqueIdentifier + '_' + files.file.name)).then(function () {
      saveDB(files.file.name, fileds.uniqueIdentifier).then(function () {
        res.send({ code: '00000', data: { url: '/uploads/' + fileds.uniqueIdentifier + '_' + files.file.name, name: files.file.name, code: fileds.uniqueIdentifier } })
      }).catch(err => {
        console.log(err)
        res.json({ code: 500, message: '操作失败' })
      })
    })
  })
}