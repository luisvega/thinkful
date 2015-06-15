var diner = require('./include/diner')
var meal = require('./include/meal')
var bill = require('./include/bill')


var luis = Object.create(diner, {
  name: {
    value: 'Luis'
  }, meal: {
    value: {
      'burger': 8,
      'fries': 3,
      'soda': 2
    }
  }
})

var john = Object.create(diner, {
  name: {
    value: 'John'
  }, meal: {
    value: {
      'nachos': 8,
      'pop': 2
    }
  }
})

var pete = Object.create(diner, {
  name: {
    value: 'Peter'
  }, meal: {
    value: {
      'burrito': 7,
      'water': 2
    }
  }
})

var bill = function(){
  var tax = 0.09
  var tipPercentage = .18
  var total = 0
  var tip = 0
  var totalDiners = arguments.length

  for(var i=0; i<totalDiners; i++) {
    var diner = arguments[i]
    for (var item in diner.meal) {
      diner.total += diner.meal[item]
    }
    total += diner.total
  }

  tipPerDiner = (Math.ceil(total * tipPercentage) / totalDiners)
  console.log("The total per diner is:")
  for(var i=0; i<totalDiners; i++) {
    var _diner = arguments[i]
    var taxDue = (_diner.total * tax)
    var totalDue = (tipPerDiner + _diner.total) + taxDue
    console.log(_diner.name +
                ': [ subtotal: ' + _diner.total +
                ' tax: '+  taxDue.toFixed(2) +
                ' tip: ' + tipPerDiner +' ]' +
                ' Total Due: ' + totalDue.toFixed(2)
               )
  }

}

bill(luis, john, pete)
