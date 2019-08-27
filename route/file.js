const express = require('express')
let chunkUpload = require('../utils/ChunkUpload.js')
const router = express.Router()

router.get('/upload', function (req, res, next) {
  console.log('check info:', req.query)
  res.status(200)
  res.send({ ...req.query })
})

router.post('/upload', function (req, res, next) {
  chunkUpload(req, res, next)
})

module.exports = router