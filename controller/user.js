let jwtUtil = require('../utils/jwtUtil')
let Dbconnection = require('../utils/dbConnect');
let connectDb = new Dbconnection();
let mysql = require('mysql');

module.exports = {
  signIn: async function (req, res, next) {
    let sql = "SELECT user_id,username,password,address FROM user a , role b WHERE a.role = b.role_id AND a.username =" + mysql.escape(req.body.name) + "AND a.password = " + mysql.escape(req.body.pws);
    let rows = await connectDb.query(sql)
    if (rows.length > 0) {
      // 登录成功，生成token，时间有效2小时
      let token = jwtUtil.createJwt(JSON.parse(JSON.stringify(rows[0])))
      res.json({ code: '00000', data: { token: token, ...JSON.parse(JSON.stringify(rows[0])) } })
    } else {
      res.json({
        code: 401,
        message: '登录失败'
      })
    }
  }
}