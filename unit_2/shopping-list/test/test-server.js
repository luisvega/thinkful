var chai = require('chai')
var chaiHttp = require('chai-http')
var server = require('../server.js')

var should = chai.should()
var app = server.app
var storage = server.storage

chai.use(chaiHttp)

describe('Shopping List', function(){
  it('should list items on GET', function(done){
    chai.request(app)
        .get('/items')
        .end(function(err, res) {
          res.should.have.status(200)
          res.should.be.json
          res.body.should.have.length(3)
          res.body[0].should.be.a('object')
          res.body[0].should.have.property('id')
          res.body[0].id.should.be.a('number')
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
          res.body.should.have.property('id')
          res.body.id.should.be.a('number')
          res.body.id.should.equal(3)
          // checking new lenght of body
          storage.items.length.should.equal(4)
          res.body.name.should.be.a('string')
          res.body.name.should.equal('Carrot')
          done()
        })
  })
  it('should edit an item on put', 
     function(done){
       chai.request(app)
           .put('/items/1')
           .send({ 'name': 'Cambell Soup' })
           .end(function(err, res) {
              res.should.have.status(201)
              res.should.be.json
              res.body.name.should.equal('Cambell Soup')
              done()
           })
  })
  it('should delete an item on delete', 
     function(done){
       chai.request(app)
           .del('/items/2')
           .end(function(err, res){
              res.should.have.status(200)
              res.body.should.property('message')
              res.body.message.should.not.equal('Item not found')
              done()
           })
     }, 
     function(done) {
       chai.request(app)
           .del('/items/123')
           .end(function(err, res){
              res.should.have.status(204)
              res.body.message.should.equal('Item not found')
              done()
           })
     })
})