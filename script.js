$(function () {

  var fruitPrice = randomNumber(-.5,.5);
  var customerCash = 100;
  var apple = new Fruit('apple',randomNumber(1,2),0,0,0);
  var orange = new Fruit('orange',randomNumber(1,2),0,0,0);
  var banana = new Fruit('banana',randomNumber(1,2),0,0,0);
  var pear = new Fruit('pear',randomNumber(1,2),0,0,0);

  var fruits = [apple, orange, banana, pear];
for (var j = 0; j < fruits.length; j++){
  displayCurrPrice(fruits[j].name, fruits[j].price);
}

setInterval(changePrice, 15000);


$('.fruitimage').on('mouseenter', function() {
$(this).closest('.box').find('.info').toggleClass('hidden');

});

$('.fruitimage').on('mouseleave', function(){

  $(this).closest('.box').find('.info').toggleClass('hidden');

});


  $('h2').text('Total Available Cash: $' + parseFloat(customerCash.toFixed(2)));
  $('.apple').data('fruitType', apple);
  $('.orange').data('fruitType', orange);
  $('.banana').data('fruitType', banana);
  $('.pears').data('fruitType', pear);


  $('.fruit').on('click', '.btn', buyFruit);





  function randomNumber(min, max) {
  	return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

  function changePrice() {

    for (var i = 0; i < fruits.length; i++) {
      if (fruits[i].price + fruitPrice < .5) {
        fruits[i].price = .5;
      } else if (fruits[i].price + fruitPrice > 11.50) {
        fruits[i].price = 11.50;
      } else {
        fruits[i].price += fruitPrice;
      }
      displayCurrPrice(fruits[i].name, fruits[i].price)
      fruitPrice= randomNumber(-.5,.5);
    }

    }

  function buyFruit() {

    if (customerCash - $(this).parent().data('fruitType').price < 0){
      alert('You dont have enough cash to make this purchase');
    } else {
      customerCash -= $(this).parent().data('fruitType').price;
      $(this).parent().data('fruitType').qtySold++;
      $(this).parent().data('fruitType').totalPurchasedCost += $(this).parent().data('fruitType').price;
      $(this).parent().data('fruitType').avgPurchasedCost = $(this).parent().data('fruitType').totalPurchasedCost / $(this).parent().data('fruitType').qtySold;
      $(this).parent().find('.totalpurchased').text('Total ' + $(this).parent().data('fruitType').name + 's purchased: ' + $(this).parent().data('fruitType').qtySold);
      $(this).parent().find('.averageprice').text('Average Purchased Cost: $' + $(this).parent().data('fruitType').avgPurchasedCost.toFixed(2));


    }

    $('h2').text('Total Available Cash: $' + parseFloat(customerCash.toFixed(2)));
  }

  function Fruit(name,price,avgPurchasedCost,qtySold,totalPurchasedCost) {
    this.name = name;
    this.price = price;
    this.avgPurchasedCost = avgPurchasedCost;
    this.qtySold = qtySold;
    this.totalPurchasedCost = totalPurchasedCost;
  }
function displayCurrPrice(fruitname, fruitprice){
  $('.' + fruitname + 'cost').text("Current Cost: $" + fruitprice.toFixed(2));
}
});
