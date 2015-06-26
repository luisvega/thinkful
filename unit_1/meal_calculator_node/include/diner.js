var Diner = function(name) {
  this.name = name;
  this.Dishes = new Array();
}

Diner.prototype.addDish = function(dish) {
  this.Dishes.push(dish)
}

Diner.prototype.showDishes = function() {
  this.Dishes.forEach(function(dish) {
    console.log(dish)
  })
}

module.exports = Diner
