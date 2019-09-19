const express = require('express')
const router = express.Router()
let goodsController = require('../controller/goods.js')

router.post('/add', function (req, res, next) {
  console.log(req.body)
  goodsController.addBrand(req, res, next)
})

router.post('/edit', function (req, res, next) {
  console.log(req.body)
  goodsController.updateBrand(req, res, next)
})

router.post('/delete', function (req, res, next) {
  console.log(req.body)
  goodsController.deleteBrand(req, res, next)
})

router.get('/selectList', function (req, res, next) {
  console.log(req.body)
  goodsController.getTypeList(req, res, next)
})

router.get('/opts', function (req, res, next) {
  console.log(req.body)
  goodsController.getOpts(req, res, next)
})

module.exports = router