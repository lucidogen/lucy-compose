/*
  # Scene proxy

  The Scene is a wrapper around the actual code and acts as proxy to enable
  async code reload.

*/
'use strict'
const live = require('lucy-live')

const Scene = function(name, loader) {
  // Code not yet loaded
  this.scene = null
  live.require(`./${name}`, loader.path, function(scene) {
    // if the scene has a cleanup function, run it now
    this.scene = scene
    // if the scene has a reload function, run it now
    if (this.scene.reload) {
      this.scene.reload()
    }
    this.scene.setup(this.setup_args)
  })
}

// This can be called before the actual scene is loaded.
Scene.prototype.setup = function(args) {
  this.setup_args = args
  if (this.scene) {
    this.scene.setup(this.setup_args)
  }
}

const defaultRender = function(time, target) {
  // FIXME: render black image
}

Scene.prototype.render = function(time, target) {
  if (this.scene) {
    this.scene.render(time, target)
  } else {
    console.log(`Scene '${this.name}' not loaded yet. Rendering black image.`)
    defaultRender(time, target)
  }
}

module.exports = Scene
