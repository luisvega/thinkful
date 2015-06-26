var Item = require('../models/item');

exports.save = function(name, callback, errback) {
  Item.create({ name: name }, function(err, item){
    if (err) {
      errback(err);
      return;
    }
    callback(item);
  });
};


exports.list = function(callback, errback) {
  Item.find(function(err, items){
    if (err) {
      errback(err);
      return;
    }
    callback(items);
  });
};


exports.update = function(id, name, callback, errback) {
  Item.findByIdAndUpdate(id, { $set : { name: name } }, function(err, item){
    if (err) {
      errback(err);
      return;
    }
    callback(item);
  });
};


exports.delete = function(id, callback, errback) {
  Item.remove({ '_id': id }, function(err, removed){
    if (err) {
      errback(err);
      return;
    }
    console.log(removed)
    callback(removed);
  })
};

