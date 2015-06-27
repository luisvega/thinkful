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
          res.body.name.should.be.a('string')
          res.body.name.should.equal('Carrot')
          chai.request(app)
            .get('/items')
            .end(function(err, res){
              res.body.should.have.length(4)
              done()
            })
        })
  });

  it('should edit an item on put',
     function(done){
       chai.request(app)
        .get('/items')
        .end(function(err, res){
          var oid = res.body[0]._id
          chai.request(app)
              .put('/items/' + oid)
              .send({ name: 'Cambell Soup' })
              .end(function(err, res) {
                 res.should.have.status(201)
                 res.should.be.json
                 res.body.name.should.equal('Cambell Soup')
                 done()
              })
        })
  });

  it('should create a new item when attempting to update an invalid record',
  function(done){
    chai.request(app)
      .put('/items/558cd092520258bd4716aca7')
      .send({ name: 'Cambell Soup' })
      .end(function(err, res) {
        res.should.have.status(201)
        res.should.be.json
        res.body.name.should.equal('Cambell Soup')
        done()
      })

  })

  it('should delete an item on delete', function(done){
    chai.request(app)
      .get('/items')
      .end(function(err, res){
        var oid = res.body[3]._id
        chai.request(app)
          .delete('/items/' + oid)
          .end(function(err, res) {
            res.should.have.status(201)
            res.should.be.json
            done()
          })
      })
  });


  it('should attempt to delete and item and fail', function(done){
    chai.request(app)
      .delete('/items/558ccff04a924657476877a')
      .end(function(err, res){
        res.should.have.status(404)
        res.should.be.json
        done()
      })
  })

  after(function(done) {
    Item.remove(function() {
      done();
   });
  });
  // add two more tests
  //
});
