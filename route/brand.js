const express = require('express')
const router = express.Router()
let brandController = require('../controller/brand.js')

router.post('/add', function (req, res, next) {
  console.log(req.body)
  brandController.addBrand(req, res, next)
})

router.post('/edit', function (req, res, next) {
  console.log(req.body)
  brandController.updateBrand(req, res, next)
})

router.post('/delete', function (req, res, next) {
  console.log(req.body)
  brandController.deleteBrand(req, res, next)
})

router.get('/list', function (req, res, next) {
  console.log(req.body)
  brandController.getBrands(req, res, next)
})

module.exports = router