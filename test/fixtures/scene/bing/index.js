'use strict'
const Scene = require('../../../../lib/Scene')

// This is kept between code reload (executed only once)
if (!exports.loaded) {
  module.exports = new Scene(
      // Default image message.
    { message: 'BING'
    }
  )
}
const self = module.exports

self.setup = function(options) {
  self.message = options.message || self.message
  self.ready()
}

self.render = function(context, target) {
  // Write our operation in `target`.
  target.result = self.message
}

