/*
  # Agnostic scene composition for Lucidity

*/
'use strict'
const caller = require('caller')
const lpath  = require('path')
const fs     = require('fs')
const Scene  = require('./compose/Scene')

const lib = {}

/////////////////////////////// Private

const SceneFolder = function(path) {
  this.path   = path
  this.scenes = {}
}

SceneFolder.prototype.load = function(name, setup_args) {
  let scene  = this.scenes[name]
  let base   = this.path
  let scenes = this.scenes

  if (!scene) {
    scene = new Scene(name, this)
    scenes[name] = scene
  }
  scene.setup(arguments)
  return scene
}

const makePath = function(caller_p) {
  return caller_p.substr(caller_p.indexOf(':') + 1)
}

/* Some doc.
 */
lib.load = function(path) {
  let base = lpath.dirname(makePath(caller()))
  path = lpath.resolve(lpath.join(base, path))
  let sceneFolder = new SceneFolder(path)
  return function(name) {
    let setup_args = Array.prototype.slice.call(arguments, 1)
    let scene = sceneFolder.load(name, setup_args)
    return scene
  }
}

module.exports = lib
