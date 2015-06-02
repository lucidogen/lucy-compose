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

SceneFolder.prototype.load = function(name, setup_args) {
  let first = setup_args[0]
  if (!  first
      || first instanceof SceneProxy
      ) {
    // insert dummy options
    setup_args.unshift({})
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
