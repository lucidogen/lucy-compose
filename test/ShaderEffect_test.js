'use strict'

require('chai').use(require('chai-as-promised')).should()
const compose      = require('../index')
const ShaderEffect = require('../lib/ShaderEffect')
const Scene        = require('../lib/Scene')
const THREE        = require('three')

describe('ShaderEFfect', function() {
  describe('new', function() {
    it('should create a ShaderEFfect', function() {
      let s = new ShaderEffect
      s.should.be.an.instanceof(ShaderEffect)
    })

    it('should inherit from Scene', function() {
      let s = new ShaderEffect
      s.should.be.an.instanceof(ShaderEffect)
      s.loaded.should.be.true
      s.ready.should.equal(Scene.prototype.ready)
    })
  }) // #new

  describe('properties', function() {
    let s = new ShaderEffect
    it('should have THREE.Scene', function() {
      s.scene.should.be.an.instanceof(THREE.Scene)
    })

    it('should have THREE.ShaderMaterial', function() {
      s.material.should.be.an.instanceof(THREE.ShaderMaterial)
    })

    it('should have setup function', function() {
      s.should.respondTo('setup')
    })

    it('should have render function', function() {
      s.should.respondTo('render')
    })
  })

}) // lucy-compose

