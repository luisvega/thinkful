var express = require('express');
var Item = require('../services/item');
var router = express.Router();


router.get('/items', function(req, res){
  Item.list(function(items){
    res.json(items);
  }, function(err) {
    res.status(400).json(err);
  });
});


router.post('/items', function(req, res){
  Item.save(req.body.name, function(item) {
    res.status(201).json(item);
  }, function(err){
    res.status(400).json(err);
  });
});


router.put('/items/:id', function(req, res){
  Item.update(req.params.id, req.body.name, function(item){
    res.status(201).json(item);
  }, function(err){
    res.status(400).json(err);
  });

});


// Need to talk about why this works and why it works

router.delete('/items/:id', function(req, res){
  var id = req.params.id;
  Item.delete(id, function(removed) {
    res.json(removed)
  }, function(err){
    res.status(404).json(err);
  });
});

module.exports = router;
