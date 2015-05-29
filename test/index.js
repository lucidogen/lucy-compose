'use strict'

const expect = require('chai').expect
const comp   = require('../index')


describe('compose', function() {
  let scene
  let fx    = comp.load('fixtures/fx')
  let trans = comp.load('fixtures/transition')

  describe('#load', function() {
    it('should #load scenes in a directory', function() {
      scene = comp.load('fixtures/scene')
      expect(scene).to.be.a('function')
    })
  }) // #foo

  describe('comp function', function() {
    it('should return scenes', function() {
      let bing = scene('bing')
      expect(bing).to.be.an('object')
    })
  })

  describe('a Scene', function() {
    it('should respond to render', function() {
      let bing = scene('bing')
      expect(bing.render).to.be.a('function')
    })

    it('should call render on sub-scenes', function() {
      let bing = scene('bing')
      let comp = fx('blur', scene('bing'))
      let time = Math.random()
      comp.render(time)
      expect(bing.scene.last_time).to.equal(time)
    })
  })

  describe('compositions', function() {
    it('should handle multiple instances', function() {
    })
  })

}) // lucy-live
