/*
  # Global THREE.WebGLRenderer

  The Scene TODO

*/
'use strict'
const THREE = require('three')

const WebGLRenderer = function() {
  let self = this

  let renderer = self.renderer = new THREE.WebGLRenderer(
    // This is needed to be able to grab the image and export it.
    { preserveDrawingBuffer: true
    }
  )

  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setPixelRatio( window.devicePixelRatio )
  document.body.appendChild( renderer.domElement )

  self.domElement = renderer.domElement

  self.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 )

  self.resize = function() {
    self.camera.aspect = window.innerWidth / window.innerHeight
    self.camera.updateProjectionMatrix()
    self.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  window.addEventListener( 'resize', self.resize, false );
  
  self.render = function( context, scene, camera, renderTarget, forceClear ) {
    self.setDefaultUniforms(context, scene.uniforms)
    renderer.render( scene, camera || self.camera, renderTarget, forceClear )
  }
  // stats = new Stats();
  // stats.domElement.style.position = 'absolute'
  // stats.domElement.style.top = '0px'
  // container.appendChild( stats.domElement )
}

let singleton

module.exports = function() {
  if (!singleton) singleton = new WebGLRenderer()
  return singleton
}
WebGLRenderer.prototype.type = 'lucy-compose.WebGLRenderer'

WebGLRenderer.prototype.setDefaultUniforms = function(context, uniforms) {
  uniforms.lucy_time    = { type: 'f', value: context.time  }
  uniforms.lucy_song    = { type: 'f', value: context.song  }
  uniforms.lucy_aspect  = { type: 'f', value: context.aspect || this.camera.aspect  }
}  
