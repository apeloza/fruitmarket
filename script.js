$(function () {

  var fruitPrice = randomNumber(-.5,.5);
  var customerCash = 100;
  var apple = new Fruit(randomNumber(1,2),0,0);
  var orange = new Fruit(randomNumber(1,2),0,0);
  var banana = new Fruit(randomNumber(1,2),0,0);
  var pear = new Fruit(randomNumber(1,2),0,0);
  var fruitSelected = $(this).data('fruitType');

  var fruits = [apple, orange, banana, pear];

  console.log(randomNumber(1,2));

  function randomNumber(min, max) {
  	return (Math.random() * (max - min) + min).toFixed(2);
  }

  function changePrice(array) {

    for (var i = 0; i < array.length; i++) {
      if (array[i].price + fruitPrice < .5) {
        array[i].price = .5;
      } else if (array[i].price + fruitPrice > 9.99) {
        array[i].price = 9.99;
      } else {
        array[i].price += fruitPrice;
      }
    }
    fruitPrice= randomNumber(-.5,.5);
  }

  function buyFruit() {

    if (customerCash - fruitSelected.price < 0){
      alert('You dont have enough cash to make this purchase');
    } else {
      customerCash -= fruitSelected.price;
      fruitSelected.qtySold++;
      fruitSelected.avgPurchasedCost = (fruitSelected.avgPurchasedCost + fruitSelected.price) / fruitSelected.qtySold;
    }
  }

  function Fruit(price,avgPurchasedCost,qtySold) {
    this.price = price;
    this.avgPurchasedCost = avgPurchasedCost;
    this.qtySold = qtySold;
  }

});
