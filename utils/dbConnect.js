let mysql = require('mysql');

function DbConnect() {
  this.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'car_auto'
  });
  this.query = function (sql, values) {
    // 返回一个 Promise
    let that = this
    return new Promise((resolve, reject) => {
      that.pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {

            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            // 结束会话
            connection.release()
          })
        }
      })
    })
  }
};
module.exports = DbConnect;
