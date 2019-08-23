const ReadFile = require('../utils/ReadFile.js')
module.exports = {
  '/static': function (req, res, filePath) {
    ReadFile(req, res, filePath);
  },
  '/api': function (req, res, url) {

  }
}