const express = require('express')
let chunkUpload = require('../utils/ChunkUpload.js')
let simpleUpload = require('../utils/simpleUpload.js')
const router = express.Router()

router.get('/chunkUpload', function (req, res, next) {
  console.log('check info:', req.query)
  res.status(200)
  res.send({ ...req.query })
})

router.post('/chunkUpload', function (req, res, next) {
  chunkUpload(req, res, next)
})

router.post('/upload', function (req, res, next) {
  simpleUpload(req, res, next)
})
module.exports = router