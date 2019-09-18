let express = require('express')
let path = require('path')
let bodyParser = require('body-parser');
let app = express()
let fileRouter = require('./route/file.js')
let userRouter = require('./route/user.js')
let brandRouter = require('./route/brand.js')
let modelRouter = require('./route/model.js')

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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

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

app.use('/api/file', fileRouter)
app.use('/api/user', userRouter)
app.use('/api/brand', brandRouter)
app.use('/api/model', modelRouter)

app.listen(9000, () => {
  console.log('服务启动完成，端口监听9000！')
})