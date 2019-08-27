const express = require('express')
const router = express.Router()
let userController = require('../controller/user.js')

router.post('/signIn', function (req, res, next) {
  console.log(req.body)
  userController.signIn(req, res, next)
})

module.exports = router