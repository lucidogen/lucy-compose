/*
  # Agnostic scene composition for Lucidity

*/
'use strict'
const caller = require('caller')
const lpath  = require('path')
const fs     = require('fs')
const SceneFolder = require('./compose/SceneFolder')
const Scene  = require('./compose/Scene')

const slice = Array.prototype.slice

/* Some doc.
 */
exports.load = function(path) {
  let base = lpath.dirname(makePath(caller()))
  path = lpath.resolve(lpath.join(base, path))
  let sceneFolder = new SceneFolder(path)
  return function(name) {
    return sceneFolder.load(name, slice.call(arguments, 1))
  }
}

exports.Scene = Scene

/////////////////////////////// Private
const makePath = function(caller_p) {
  return caller_p.substr(caller_p.indexOf(':') + 1)
}

