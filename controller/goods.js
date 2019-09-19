let Dbconnection = require('../utils/dbConnect');
let connectDb = new Dbconnection();

module.exports = {
  getTypeList: function (req, res, next) {
    let sql = 'SELECT * from brand, model WHERE brand.brand_id = model.brand_id'
    connectDb.query(sql, [req.body.name, req.body.brand_id]).then(function (result) {
      let temp = {}
      let arr = []
      result.map(item => {
        if (!temp.hasOwnProperty(item.brand_name)) {
          temp[item.brand_name] = {
            label: item.brand_name,
            value: item.brand_id,
            children: [{
              label: item.model_name,
              value: item.model_id
            }]
          }
        } else {
          temp[item.brand_name].children.push({
            label: item.model_name,
            value: item.model_id
          })
        }
      })
      Object.keys(temp).forEach(item => {
        arr.push(temp[item])
      })
      res.json({ code: '00000', data: arr })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  },
  addModel: function (req, res, next) {
    let sql = 'INSERT INTO model (model_name, brand_id) VALUES (?, ?)'
    if (req.body.name === '' || !req.body.name) {
      return res.json({ code: 500, message: '名称不能为空' })
    } else if (req.body.brand_id === '' || !req.body.brand_id) {
      return res.json({ code: 500, message: '品牌不能为空' })
    } else {
      connectDb.query(sql, [req.body.name, req.body.brand_id]).then(function (result) {
        res.json({ code: '00000', result: JSON.parse(JSON.stringify(result)) })
      }).catch(err => {
        res.json({ code: 500, message: '操作失败' })
      })
    }
  },
  deleteModel: function (req, res, next) {
    let sql = 'DELETE FROM model WHERE model_id = ? '
    connectDb.query(sql, [req.body.id]).then(function (result) {
      res.json({ code: '00000', result: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  },
  updateModel: function (req, res, next) {
    let sql = 'UPDATE model SET model_name = ?, brand_id = ? WHERE model_id = ?'
    connectDb.query(sql, [req.body.name, req.body.brand_id, req.body.id]).then(function (result) {
      res.json({ code: '00000', result: JSON.parse(JSON.stringify(result)) })
    }).catch(err => {
      res.json({ code: 500, message: '操作失败' })
    })
  },
  getModels: function (req, res, next) {
    let param = req.query || req.params;
    let pageNum = parseInt(param.page || 1);// 页码
    let end = parseInt(param.pageSize || 10); // 默认页数
    let start = (pageNum - 1) * end;
    let fileter = ''
    let prop = param.prop || 'model_name'
    let order = param.order || false
    let defaultSort = ''
    if (param.hasOwnProperty('search')) {
      fileter = `AND model_name LIKE '%${param.search}%'`
    }
    if (order) {
      defaultSort = (order === 'descending' ? 'DESC' : 'ASC')
    }
    let sql = `select SQL_CALC_FOUND_ROWS * from model, brand WHERE model.brand_id = brand.brand_id  ${fileter} order by convert (${prop} using gbk) ${defaultSort} limit ?, ?`
    let totalSql = `SELECT FOUND_ROWS() as total;`
    console.log(param, sql)
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