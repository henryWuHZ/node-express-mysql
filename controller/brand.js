let Dbconnection = require('../utils/dbConnect');
let connectDb = new Dbconnection();

module.exports = {
  addBrand: function (req, res, next) {
    let sql = 'INSERT INTO brand (brand_name) VALUES (?)'
    connectDb.query(sql, [req.body.name]).then(function (result) {
      res.json({ result: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })

  },
  deleteBrand: function (req, res, next) {
    let sql = 'DELETE FROM brand WHERE brand_id = ? '
    connectDb.query(sql, [req.body.id]).then(function (result) {
      res.json({ result: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  },
  updateBrand: function (req, res, next) {
    let sql = 'UPDATE brand SET brand_name = ? WHERE brand_id = ?'
    connectDb.query(sql, [req.body.name, req.body.id]).then(function (result) {
      res.json({ result: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  },
  getBrands: function (req, res, next) {
    let param = req.query || req.params;
    let pageNum = parseInt(param.pageNum || 1);// 页码
    let end = parseInt(param.pageSize || 10); // 默认页数
    let start = (pageNum - 1) * end;
    let sql = 'select * from brand order by convert (brand_name using gbk) limit ?, ?'
    console.log(param, start, end)
    connectDb.query(sql, [start, end]).then(function (result) {
      console.log(result)
      res.json({ result: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  }
}