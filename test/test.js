'use strict'

require('chai').use(require('chai-as-promised')).should()
const compose = require('../index')
const Scene   = require('../compose/Scene')

describe('lucy-compose', function() {
  let scene = compose.load('fixtures/scene')
  let fx    = compose.load('fixtures/fx')
  let trans = compose.load('fixtures/transition')

  describe('#load', function() {
    it('should create a loader', function() {
      scene.should.be.a('function')
    })
  }) // #load
  
  describe('loader', function() {

    it('should return scene proxy', function() {
      scene('bing').ready.should
        .be.an.instanceof(Promise)
    })

    it('should compose with sub-scenes', function(done) {
      fx('blur', scene('bing')).ready.should.eventually
        .be.an.instanceof(Scene)
        .have.property('render')
        .notify(done)
    })
  })

  describe('scene', function() {
    it('should respond to render', function(done) {
      scene('bing').ready.should.eventually
        .have.property('render')
        .that.is.a('function')
        .notify(done)
    })

    it('should render with sub-scenes', function(done) {
      fx('blur', scene('bing')).ready.then(function(comp) {
        let time = Math.random()
        let target = {}
        comp.render(time, target)
        target.result.should.to.equal('~BING~')
        done()
      }).catch(function(e) {done(e)})
    })

    it('should render with options in sub-scenes', function(done) {
      fx('blur', scene('bing')).ready.then(function(comp) {
        let time = Math.random()
        let target = {}
        comp.render(time, target)
        target.result.should.equal('~BING~')
        done()
      }).catch(function(e) {done(e)})
    })

    it('should handle multiple instances', function() {
      // TODO
    })
  }) // #load

}) // lucy-compose