/*
  # Agnostic scene composition for Lucidity

*/
'use strict'
const caller = require('caller')
const lpath  = require('path')
const fs     = require('fs')
const SceneFolder = require('./compose/SceneFolder')

/* Some doc.
 */
exports.load = function(path) {
  let base = lpath.dirname(makePath(caller()))
  path = lpath.resolve(lpath.join(base, path))
  let sceneFolder = new SceneFolder(path)
  return function(name) {
    return sceneFolder.load(name, Array.prototype.slice.call(arguments, 1))
  }
}

/////////////////////////////// Private
const makePath = function(caller_p) {
  return caller_p.substr(caller_p.indexOf(':') + 1)
}

