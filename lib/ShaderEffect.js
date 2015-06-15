/*
  # ShaderEffect extends Scene

  A lucy-compose Scene for glsl shader effect transformation of texture content.

*/
'use strict'
const Scene = require('./Scene')
const THREE = require('three')
const WebGLRenderer = require('./WebGLRenderer')

const DEFAULT = {}

const ShaderEffect = function(options) {
  options = options || {}
  let self = this
  Scene.call(self, options)

  self.uniforms = options.uniforms || {}
  self.uniforms.tDiffuse    = { type: 't', value: null }
  self.uniforms.lucy_time   = { type: 'f', value: 0 }
  self.uniforms.lucy_song   = { type: 'f', value: 0 }
  self.uniforms.lucy_aspect = { type: 'f', value: 0 }

  self.material =
    new THREE.ShaderMaterial(
      { uniforms:       self.uniforms
      , vertexShader:   options.vertexShader   || DEFAULT.VERT
      , fragmentShader: options.fragmentShader || DEFAULT.FRAG
      }
    )

  self.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), null )
  self.quad.material = self.material

  self.scene = new THREE.Scene()
  self.scene.add( self.quad )
}

module.exports = ShaderEffect
ShaderEffect.prototype.type = 'lucy-compose.ShaderEffect'

// Inherit from Scene
for(let k in Scene.prototype) {
  ShaderEffect.prototype[k] = Scene.prototype[k]
}

ShaderEffect.prototype.setup = function(options, sub) {
  let self = this

  // lazy loading
  self.renderer = WebGLRenderer()

  if (sub) {
    self.target = new THREE.WebGLRenderTarget
      ( options.w || window.innerWidth
      , options.h || window.innerHeight
      , { minFilter: THREE.LinearFilter
        , magFilter: THREE.LinearFilter
        , format: THREE.RGBFormat
        , stencilBuffer: false
        }
      )

    sub.ready.then(function(s) {
      self.sub = s
      self.ready()
    })
  } else {
    self.sub = null
    self.ready()
  }
}

ShaderEffect.prototype.render = function(context, target) {
  let self = this

  if (self.sub) {
    // Render sub-scene into our target
    self.sub.render(context, self.target)

    // Copy target into our tDiffuse texture
    self.uniforms.tDiffuse.value = self.target
  }

  self.setDefaultUniforms(context)

  // Render our effect
  self.renderer.render(self.scene, self.camera, target)
}

ShaderEffect.prototype.setDefaultUniforms = function(context) {
  // FIXME: SHOULD MODIFY THREE.js to get missing uniforms during compilation
  //        from camera !!!!
  this.uniforms.lucy_time.value   = context.time
  this.uniforms.lucy_song.value   = context.song
  this.uniforms.lucy_aspect.value = context.aspect || this.renderer.camera.aspect
}

ShaderEffect.prototype.stop = function(context) {
  // noop
}

DEFAULT.VERT = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`

DEFAULT.FRAG = `
uniform sampler2D tDiffuse;
varying vec2 vUv;

void main() {
  vec4 color = texture2D( tDiffuse, vUv );
  gl_FragColor = color;
}


`
