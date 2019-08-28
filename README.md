## 基于express + mysql node后台项目

### 功能列表
- [X]基于vue-simple-uploader文件分片上传
- [X]基于jsonwebtoken token验证，CORS机制应用
- 基于mysql 商城服务数据库搭建

### 项目结构
├── Readme.md                   // help
├── config                      // 配置
│   ├── config.js               
├── controller                  // 业务模块
│   ├── user.js                 // 用户相关业务功能实现
├── route                       // 业务模块路由配置
│   ├── user.js                 // 用户相关路由
│   ├── file.js                 // 文件服务相关路由
├── static                      // web静态资源加载
├── tmp                         // 分片缓存地址
├── uploads                     // 上传文件地址
├── utils                       // 通用方法库
├── expressServer.js            // 入口文件
└── package.json                // 依赖包

### 启动
npm install
npm run dev

### 持续更新中 QAQ

