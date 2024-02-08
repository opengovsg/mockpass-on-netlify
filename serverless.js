const app = require('./api')
const serverless = require('serverless-http')

exports.handler = serverless(app, {
  binary: ['image/*', 'font/*']
})
