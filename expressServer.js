let express = require('express')
let path = require('path')
let app = express()
let chunkUpload = require('./utils/ChunkUpload.js')

// 处理静态资源
app.use(express.static(path.join(__dirname, 'static')))

// 处理跨域
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  if (req.method == 'OPTIONS') res.send(200) /*让options请求快速返回*/
  else next()
})
app.post('/test', function (req, res) {
  res.send({
    "aa": 123
  })
})

app.get('/file/upload', function (req, res, next) {
  console.log('check info:', req.query)
  res.status(200)
  res.send({ ...req.query })
})

app.post('/file/upload', function (req, res, next) {
  chunkUpload(req, res, next)
})

app.listen(9000, () => {
  console.log('服务启动完成，端口监听9000！')
})