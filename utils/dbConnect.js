let mysql = require('mysql');
let jwtUtil = require('./jwtUtil')

function DbConnect() {
  this.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'car_auto'
  });
  this.getLogin = function (username, password) {
    let that = this
    let sql = "SELECT user_id,username,password,address FROM user a , role b WHERE a.role = b.role_id AND a.username =" + mysql.escape(username) + "AND a.password = " + mysql.escape(password);
    console.log(sql)
    that.pool.getConnection(async function (err, connection) {
      await connection.query(sql, function (err, result) {
        if (err) {
          console.log("error: " + err);
          return;
        }
        console.log("result: " + JSON.stringify(result));
        //回收pool
        connection.release();
        if (result.length > 0) {
          // 登录成功，生成token，时间有效2小时
          let token = jwtUtil.createJwt(JSON.parse(JSON.stringify(result[0])))
          return { token: token, ...result[0] }
        }
      });
    })

  };
  this.toCreateSession = function (userInfo) {

  }
  this.register = function (username, password) {
    //注册账户必须有对应的员工信息
    var sql = "insert into user (username,password,employee,role) values('" + username + "','" + password + "',(SELECT employee_id FROM employee a WHERE a.job_number = '" + username + "'),'1')";
    this.connection.query(sql, function (err, result) {
      if (err) {
        console.log("error: " + err);
        return;
      }
      console.log("result: " + JSON.stringify(result));
    });
  };
  this.deleteUser = function (jobId) {
    var sql = "DELETE FROM user WHERE employee =(SELECT employee_id FROM employee a WHERE a.job_number = '" + jobId + "')";
    this.connection.query(sql, function (err, result) {
      if (err) {
        console.log("error: " + err);
        return false;
      }
      console.log("result: " + JSON.stringify(result));
      return true;
    });
  }
  //添加员工信息
  this.addEmp = function (employee) {
    var sql = "INSERT INTO employee (employee_name,gender,birth_date,job_number,home_address,identity_card_number,phone_number,email,join_date,organization)VALUES ('" + employee.getName() + "','" + employee.getSex() + "','" + employee.getBirthday() + "','" + employee.getJobId() + "','" + employee.getAddress() + "','" + employee.getIdentityCard() + "','" + employee.getPhone() + "','" + employee.getEmail() + "','" + employee.getJoinDate() + "',(SELECT organization_id FROM organization a WHERE a.organization_code = '" + employee.getDepartment() + "'))";
    this.connection.query(sql, function (err, result) {
      if (err) {
        console.log("error: " + err);
        return;
      }
      console.log("result: " + JSON.stringify(result));
    });
  };
  //删除员工信息
  this.deleteEmp = function (jobId) {
    //由于表级关联，得先删除用户，再删除员工信息
    if (this.deleteUser(jobId)) {
      var sql = "DELETE FROM employee WHERE job_number ='" + jobId + "'";
      this.connection.query(sql, function (err, result) {
        if (err) {
          console.log("error: " + err);
          return;
        }
        console.log("result: " + JSON.stringify(result));
      });
    }
  };
  this.getEmpInfo = function (jobId) {
    var sql = "SELECT a.employee_name,a.gender,a.birth_date,a.job_number,a.home_address,a.identity_card_number,a.phone_number,a.email,a.join_date,b.organization_code FROM employee a , organization b WHERE a.organization=b.organization_id AND job_number ='" + jobId + "'";
    this.connection.query(sql, function (err, result) {
      if (err) {
        console.log("error: " + err);
        return;
      } else {
        return JSON.stringify(result)
      }
      console.log("result: " + JSON.stringify(result));
    });
  }
};
module.exports = DbConnect;
