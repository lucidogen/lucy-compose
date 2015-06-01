/*
  # Scene proxy

  The SceneProxy is a wrapper around the actual code and acts as proxy to enable
  async code reload.

*/
'use strict'
const live = require('lucy-live')

const SceneProxy = function(name, loader) {
  let self = this

  // This promise handles scene loading
  // This promise handles scene setup (resolved when scene calls this.ready())
  self.ready = new Promise(function(resolve, reject) {
    self.ready_resolve = resolve
    self.ready_reject  = reject
  })

  // self.ready.then(function(o) {
  //   console.log(name, 'READY')
  // })

  // Code not yet loaded
  self.loaded = new Promise(function(resolve, reject) {
    // FIXME: Change live.require API to deal with errors ?
    live.require(`./${name}`, loader.path, function(scene) {
      // The 'scene' object returned here is a real scene, not a
      // SceneProxy.

      // Install ready/error hooks.
      scene._setup(self.ready_resolve, self.ready_reject)

      // If the scene has a reload function, run it now
      if (scene.reload) {
        scene.reload()
      }

      // The scene is ready
      resolve(scene)
    })
  })
}

module.exports = SceneProxy
