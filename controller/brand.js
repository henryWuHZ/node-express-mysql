let Dbconnection = require('../utils/dbConnect');
let connectDb = new Dbconnection();

module.exports = {
  addBrand: function (req, res, next) {
    let sql = 'INSERT INTO brand (brand_name) VALUES (?)'
    if (req.body.name === '' || !req.body.name) {
      return res.json({ code: 500, message: '名称不能为空' })
    } else {
      connectDb.query(sql, [req.body.name]).then(function (result) {
        res.json({ code: '00000', result: JSON.parse(JSON.stringify(result)) })
      }).catch(err => {
        res.json({ code: 500, message: '操作失败' })
      })
    }
  },
  deleteBrand: function (req, res, next) {
    let sql = 'DELETE FROM brand WHERE brand_id = ? '
    connectDb.query(sql, [req.body.id]).then(function (result) {
      res.json({ code: '00000', result: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  },
  updateBrand: function (req, res, next) {
    let sql = 'UPDATE brand SET brand_name = ? WHERE brand_id = ?'
    connectDb.query(sql, [req.body.name, req.body.id]).then(function (result) {
      res.json({ code: '00000', result: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  },
  getOpts: function (req, res, next) {
    let sql = 'select * from brand order by convert (brand_name using gbk)'
    connectDb.query(sql).then(function (result) {
      res.json({ code: '00000', data: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  },
  getBrands: function (req, res, next) {
    let param = req.query || req.params;
    let pageNum = parseInt(param.page || 1);// 页码
    let end = parseInt(param.pageSize || 10); // 默认页数
    let start = (pageNum - 1) * end;
    let fileter = ''
    if (param.hasOwnProperty('search')) {
      fileter = `WHERE brand_name LIKE '%${param.search}%'`
    }
    let sql = `select SQL_CALC_FOUND_ROWS * from brand ${fileter} order by convert (brand_name using gbk) limit ?, ?`
    let totalSql = `SELECT FOUND_ROWS() as total;`
    console.log(param, start, end)
    connectDb.query(sql, [start, end]).then(function (result) {
      connectDb.query(totalSql).then(function (result2) {
        console.log(result, result2)
        res.json({ code: '00000', data: { tbody: JSON.parse(JSON.stringify(result)), pageInfo: { page: pageNum, size: parseInt(param.pageSize), total: result2[0].total } } })
      })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  }
}