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
Scene.prototype.type = 'lucy-compose.Scene'

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

// This is called by lucy-app when the scene starts running.
Scene.prototype.online = function(data) {
}

// This is called by lucy-app when the scene stops running. This is NOT called
// on application pause. Only when a scene goes offline.
Scene.prototype.offline = function() {
  // whatever is returned from this function is passed to the next 'online'
  // scene.
  return null
}


// private. Called by self and lucy-app
Scene.prototype._onlineSub = function(data) {
  if (this.sub) {
    this.sub._onlineSub()
    this.sub.online()
  }
}

// private. Called by self and lucy-app
Scene.prototype._offlineSub = function() {
  if (this.sub) {
    this.sub.offline()
    this.sub._offlineSub()
  }
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

