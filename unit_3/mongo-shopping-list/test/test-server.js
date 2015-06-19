var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId()

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
  before(function(done){
    seed.run(function() {
      done();
    });
  });
  it('should list items on GET', function(done){
    chai.request(app)
      .get('/items')
      .end(function(err, res){
          res.should.have.status(200)
          res.should.be.json
          res.body.should.have.length(3)
          res.body[0].should.be.a('object')
          res.body[0].should.have.property('_id')
          res.body[0].name.should.be.a('string')
          res.body[0].name.should.equal('Broad beans')
          res.body[1].name.should.equal('Tomatoes')
          res.body[2].name.should.equal('Peppers')
          done()
    })
  });
  after(function(done) {
    Item.remove(function() {
      done();
   });
  });
});


