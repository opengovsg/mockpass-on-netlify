const { app } = require('@opengovsg/mockpass')
const serverless = require('serverless-http')

exports.handler = serverless(app, {
  binary: ['image/*', 'font/*']
})
