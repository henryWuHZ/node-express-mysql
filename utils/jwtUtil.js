let jwt = require("jsonwebtoken")

const createJwt = function (userInfo) {
  console.log('userinfo', userInfo)
  let secretKey = 'WH_LOVE_SWT'
  let token = jwt.sign(userInfo, secretKey, {
    expiresIn: 60 * 60 * 2  // 2小时过期
  })
  console.log("token ：" + token)
  return token
}

const checkJwt = function (token) {
  let secretKey = 'WH_LOVE_SWT'
  jwt.verify(token, secretKey, function (err, decode) {
    if (err) return false
    else {
      return decode
    }
  })
}
module.exports = { createJwt, checkJwt }
