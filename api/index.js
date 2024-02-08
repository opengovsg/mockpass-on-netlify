if (process.env.VERCEL) {
  // We are using Vercel, so we have to trigger a read of the static files
  // needed by MockPass so that Vercel knows that we keep them at runtime
  const fs = require('fs')
  const path = require('path')

  const pathPrefix = path.resolve(__dirname, '../node_modules/@opengovsg/mockpass/static')
  fs.readdirSync(pathPrefix).map(dir => fs.readdirSync(path.resolve(pathPrefix, dir)))
}

const { app } = require('@opengovsg/mockpass')

module.exports = app
