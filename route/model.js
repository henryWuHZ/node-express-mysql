const express = require('express')
const router = express.Router()
let modelController = require('../controller/modelList.js')

router.post('/add', function (req, res, next) {
  console.log(req.body)
  modelController.addModel(req, res, next)
})

router.post('/edit', function (req, res, next) {
  console.log(req.body)
  modelController.updateModel(req, res, next)
})

router.post('/delete', function (req, res, next) {
  console.log(req.body)
  modelController.deleteModel(req, res, next)
})

router.get('/list', function (req, res, next) {
  console.log(req.body)
  modelController.getModels(req, res, next)
})

module.exports = router