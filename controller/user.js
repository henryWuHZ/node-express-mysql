let jwtUtil = require('../utils/jwtUtil')
let Dbconnection = require('../utils/dbConnect');
let connectDb = new Dbconnection();

module.exports = {
  signIn: async function (req, res, next) {
    let sql = "SELECT user_id,username,password,address FROM user a , role b WHERE a.role = b.role_id AND a.username = ? AND a.password = ?";
    connectDb.query(sql, [req.body.name, req.body.pws]).then(function (rows) {
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
    }).catch(err => {
      res.json({ code: 500, message: '登录失败' })
    })
  }
}