let express = require('express')
let path = require('path')
let bodyParser = require('body-parser');
let app = express()
let chunkUpload = require('./utils/ChunkUpload.js')
let Dbconnection = require('./utils/dbConnect');
let connectDb = new Dbconnection();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(function (req, res, next) {
  // console.log(req.url, req.headers)
  // 静态资源访问鉴权
  // 用户token会话鉴权
  next()
})
// 处理静态资源
app.use('/static', express.static(path.join(__dirname, 'static')))

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

app.get('/test', function (req, res) {
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

app.post('/signIn', function (req, res, next) {
  console.log(req.body)
  // connectDb.createConnect();
  let body = connectDb.getLogin(req.body.name, req.body.pws);
  console.log(body)
  if (body) {
    res.json(...body)
  }
  // connectDb.stopConnect();
})

app.listen(9000, () => {
  console.log('服务启动完成，端口监听9000！')
})