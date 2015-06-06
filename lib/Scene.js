/*
  # Scene

  The Scene TODO

*/
'use strict'

const Scene = function(options) {
  let self = this
  self.loaded = true
  for(let k in options) { self[k] = options[k] }
}

module.exports = Scene

Scene.prototype.setup = function() {
  this.ready()
}

Scene.prototype.ready = function() {
  let err = new Error('scene.ready() can only be called from inside setup function.')
  this.error_message = err
  throw err
}

Scene.prototype.error = function(m) {
  // Save error until we call _setup
  let err = new Error(m)
  this.error_value = err
  throw err
}

Scene.prototype._setup = function(resolve, reject) {
  this.ready = function() {
    resolve(this)
  }
  this.error = function(err) {
    reject(err)
  }

  if (this.error_value) {
    let e = this.error_value
    delete this.error_value
    this.error(e)
  }
}

