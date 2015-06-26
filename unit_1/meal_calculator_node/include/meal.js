var Meal = function(name) {
  this.name = name;
  this.tax = 0;
  this.tip = 0;
  this.Diners = new Array();

}

Meal.prototype.addDiner = function (diner) {
  this.Diners.push(diner)
};

Meal.prototype.printBill = function (first_argument) {
  var bill_due = 0;
  var tax_due = 0;
  var tip_due = 0;
  var total_due = 0;
  this.Diners.forEach(function(diner) {
    diner.Dishes.forEach(function(meal) {
      bill_due += meal.price
    })
  });
  tax_due = bill_due * (this.tax/100);
  tip_due = Math.ceil(bill_due * (this.tip/100));
  total_due = bill_due + tax_due + tip_due;
  console.log('Due: ', bill_due)
  console.log('Tip: ', tip_due)
  console.log('Tax: ', tax_due)
  console.log('Total Due: ', total_due)
};


module.exports = Meal
