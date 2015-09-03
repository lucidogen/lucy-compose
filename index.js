/*
  # Agnostic scene composition for Lucidity

*/
'use strict'
const caller = require ('caller')
const lpath  = require ('path')
const fs     = require ('fs')
const SceneFolder     = require ('./lib/SceneFolder')
const Scene           = require ('./lib/Scene')

const slice = Array.prototype.slice

let default_options
exports.setDefaultOptions = function ( opts )
{ default_options = opts
}

/* Some doc.
 */
exports.load = function ( path )
{ let base = lpath.dirname ( makePath ( caller () ) )
  path = lpath.resolve ( lpath.join ( base, path ) )
  let sceneFolder = new SceneFolder ( path )
  return function ( name )
  { return sceneFolder.load
    ( name
    , slice.call ( arguments, 1 )
    , default_options
    )
  }
}

exports.Scene = Scene

/////////////////////////////// Private
const makePath = function ( caller_p )
{ return caller_p.substr ( caller_p.indexOf ( ':' ) + 1 )
}

