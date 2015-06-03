/*
  # Global THREE.WebGLRenderer

  The Scene TODO

*/
'use strict'
const THREE = require('three')

const WebGLRenderer = function() {
  let self = this
  let renderer = self.renderer = new THREE.WebGLRenderer
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.setPixelRatio( window.devicePixelRatio )
  document.body.appendChild( renderer.domElement )

  self.camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 )

  self.resize = function() {
    self.camera.aspect = window.innerWidth / window.innerHeight
    self.camera.updateProjectionMatrix()
    self.renderer.setSize( window.innerWidth, window.innerHeight )
  }

  window.addEventListener( 'resize', self.resize, false );
  
  self.render = function( scene, camera, renderTarget, forceClear ) {
    renderer.render( scene, camera || self.camera, renderTarget, forceClear )
  }
  // stats = new Stats();
  // stats.domElement.style.position = 'absolute'
  // stats.domElement.style.top = '0px'
  // container.appendChild( stats.domElement )
}

// Singleton
module.exports = new WebGLRenderer
