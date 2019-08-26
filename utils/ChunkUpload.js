let formiadble = require('formidable') // 文件上传
let fs = require('fs-extra')
let path = require('path')
let concat = require('concat-files')
const config = require('../config/config.js');
let uploadDir = path.join(config.root, 'uploads')

// 文件夹是否存在, 不存在则创建文件
function folderIsExit(folder) {
  console.log('folderIsExit', folder)
  return new Promise(async (resolve, reject) => {
    await fs.ensureDir(path.join(folder), function (err) {
      if (!err) resolve(true)
      else reject(err)
    })
  })
}
// 把文件从一个目录拷贝到别一个目录
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

// 列出文件夹下所有文件
function listDir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) {
        reject(err)
        return
      }
      // 把mac系统下的临时文件去掉
      if (data && data.length > 0 && data[0] === '.DS_Store') {
        data.splice(0, 1)
      }
      resolve(data)
    })
  })
}

// 合并文件
async function mergeFiles(srcDir, targetDir, newFileName) {
  let fileArr = await listDir(srcDir)
  fileArr = fileArr.sort((a, b) => { return a - b })
  // 把文件名加上文件夹的前缀
  for (let i = 0; i < fileArr.length; i++) {
    fileArr[i] = srcDir + '/' + fileArr[i]
  }
  concat(fileArr, path.join(targetDir, newFileName), () => {
    console.log('Merge Success!')

    fs.remove(srcDir).then(() => {
      console.log('remove tmp file')
    })
      .catch(err => {
        console.error(err)
      })
  })
}

module.exports = async function (req, res, next) {
  let tmpPath = path.join(config.root, 'tmp')
  let form = new formiadble.IncomingForm({ uploadDir: tmpPath })
  form.parse(req, function (err, fileds, file) {
    let index = parseInt(fileds.chunkNumber)
    let total = parseInt(fileds.totalChunks)
    let uuid = fileds.identifier
    let fileName = fileds.filename
    let folder = path.resolve(config.root, 'uploads', uuid)
    console.log('tmp:', tmpPath, ' folder:', folder)
    folderIsExit(folder).then(function () {
      let destFile = path.resolve(folder, index + '')
      copyFile(file.file.path, destFile).then(
        successLog => {
          if (index === total) {
            res.status(200)
            res.send({ ...fileds, code: '00000', uploaded: true })
            mergeFiles(path.join(uploadDir, uuid), uploadDir, fileName)
          } else {
            res.status(200)
            res.send({ ...fileds })
          }
        },
        errorLog => {
          resp.send({
            stat: 0,
            desc: 'Error'
          })
        }
      )
    })
  })
}