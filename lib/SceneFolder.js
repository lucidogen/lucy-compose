/*
  # Scene folder

  The SceneFolder loads and handles a cache of scene proxies inside a given
  folder.

*/
'use strict'
const SceneProxy  = require('./SceneProxy')
const Scene       = require('./Scene')

const SceneFolder = function(path) {
  this.path   = path
  this.proxies = {}
}

module.exports = SceneFolder
SceneFolder.prototype.type = 'lucy-compose.SceneFolder'

SceneFolder.prototype.load = function(name, setup_args, default_options) {
  let first = setup_args[0]
  if (!  first
      || first instanceof SceneProxy
      ) {
    // insert dummy options
    setup_args.unshift({})
  }

  if (default_options) {
    let opts = setup_args[0]
    for (let key in default_options) {
      opts[key] = default_options[key]
    }
  }


  let proxies = this.proxies
  let proxy  = proxies[name]

  if (!proxy) {
    proxy = new SceneProxy(name, this)
    proxies[name] = proxy
  }
  
  proxy.loaded.then(function(scene) {
    scene.setup.apply(scene, setup_args)
  })
  return proxy
}

SceneFolder.prototype.setDefaultOptions = function(opts) {
  this.default_options = opts
}

