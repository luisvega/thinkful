# Notes

  // Create dishes
  var dish1 = new Dish('bacon', 10);
  var dish2 = new Dish('french fries', 8);
  var dish3 = new Dish('ice cream', 5);
  var dish4 = new Dish('ravioli', 12);
  var dish5 = new Dish('hamburguer', 11);
  var dish6 = new Dish('chocolate brownie', 6);



  // Create diners with their dishes
  var diner1 = new Diner('Valeria');
  var diner2 = new Diner('Agustin');
  var diner3 = new Diner('Mariano');
  diner1.addDish(dish1);
  diner1.addDish(dish2);
  diner2.addDish(dish3);
  diner2.addDish(dish4);
  diner3.addDish(dish5);
  diner3.addDish(dish6);

  // Create meal with its diners
  var meal1 = new Meal('Farewell meal');
  meal1.addDiner(diner1);
  meal1.addDiner(diner2);
  meal1.addDiner(diner3);


  // Set values and print meal's bill
  meal1.tax = 11;
  meal1.tip = 15;
  meal1.printBill();
  meal1.printBill(true);
