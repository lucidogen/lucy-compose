'use strict'

const expect  = require('chai').expect
const compose = require('../index')


describe('lucy-compose', function() {
  let scene = compose.load('fixtures/scene')
  let fx    = compose.load('fixtures/fx')
  let trans = compose.load('fixtures/transition')

  describe('#load', function() {
    it('should create a loader', function() {
      expect(scene).to.be.a('function')
    })
  }) // #load
  
  describe('loader', function() {

    it('should return scene proxy', function() {
      let bing = scene('bing')
      expect(bing.ready).to.be.an('object')
      expect(bing.ready.then).to.be.a('function')
    })

    it('should compose with sub-scenes', function(done) {
      fx('blur', scene('bing')).ready.then(function(comp) {
        expect(bing).to.be.an('object')
        expect(bing.render).to.be.a('function')
        done()
      })
    })
  })

  describe('scene', function() {
    it('should respond to render', function(done) {
      scene('bing').ready.then(function(bing) {
        console.log('bing ready', bing)
        expect(bing.render).to.be.a('function')
        done()
      })
    })

    it('BB should render with sub-scenes', function(done) {
      fx('blur', scene('bing')).ready.then(function(comp) {
        let time = Math.random()
        let target = {}
        comp.render(time, target)
        expect(target.result).to.equal('~BING~')
        done()
      })
    })

    it('should render with options in sub-scenes', function(done) {
      fx('blur', scene('bing')).ready.then(function(comp) {
        let time = Math.random()
        let target = {}
        comp.render(time, target)
        expect(target.result).to.equal('xxxx')
        done()
      })
    })

    it('should handle multiple instances', function() {
    })
  }) // #load

}) // lucy-compose
