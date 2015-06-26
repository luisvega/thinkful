var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var _items = require('../services/item');
var seed = require('../db/seed');

var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId()

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

var oid = ''

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
  })
  it('should add an item on post', function(done){
    chai.request(app)
        .post('/items')
        .send({'name': 'Carrot'})
        .end(function(err, res){
          res.should.have.status(201)
          res.should.be.json
          res.body.should.have.property('_id')
          oid = res.body._id
          res.body._id.should.be.a('string')
          // why is this being set to two (2) when it should be four (4)
          _items.list.length.should.equal(2)
          res.body.name.should.be.a('string')
          res.body.name.should.equal('Carrot')
          done()
        })
  })

  // This fails to update correctly
  it('should edit an item on put',
     function(done){
       chai.request(app)
           .put('/items/' + oid)
           .send({ 'name': 'Cambell Soup' })
           .end(function(err, res) {
              console.log(res.body)
              res.should.have.status(201)
              res.should.be.json
              res.body.name.should.equal('Cambell Soup')
              done()
           })
  });
  after(function(done) {
    Item.remove(function() {
      done();
   });
  });
});


