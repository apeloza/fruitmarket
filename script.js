$(function () {

  var fruitPrice = randomNumber(-.5,.5);
  var customerCash = 100;
  var apple = new Fruit('apple',randomNumber(1,2),0,0,0);
  var orange = new Fruit('orange',randomNumber(1,2),0,0,0);
  var banana = new Fruit('banana',randomNumber(1,2),0,0,0);
  var pear = new Fruit('pear',randomNumber(1,2),0,0,0);

  var fruits = [apple, orange, banana, pear];


$('.fruitimage').on('mouseenter', function() {

$(this).closest('.box').find('.info').toggleClass('hidden');

});

$('.fruitimage').on('mouseleave', function(){

  $(this).closest('.box').find('.info').toggleClass('hidden');

})


  $('h2').text('Total Available Cash: $' + parseFloat(customerCash.toFixed(2)));
  $('.apple').data('fruitType', apple);
  $('.orange').data('fruitType', orange);
  $('.banana').data('fruitType', banana);
  $('.pears').data('fruitType', pear);


  $('.fruit').on('click', '.btn', buyFruit);





  function randomNumber(min, max) {
  	return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

  function changePrice(array) {

    for (var i = 0; i < array.length; i++) {
      if (array[i].price + fruitPrice < .5) {
        array[i].price = .5;
      } else if (array[i].price + fruitPrice > 11.50) {
        array[i].price = 11.50;
      } else {
        array[i].price += fruitPrice;
      }
    }
    fruitPrice= randomNumber(-.5,.5);
  }

  function buyFruit() {

    if (customerCash - $(this).parent().data('fruitType').price < 0){
      alert('You dont have enough cash to make this purchase');
    } else {
      customerCash -= $(this).parent().data('fruitType').price;
      $(this).parent().data('fruitType').qtySold++;
      $(this).parent().data('fruitType').totalPurchasedCost += $(this).parent().data('fruitType').price;
      $(this).parent().data('fruitType').avgPurchasedCost = $(this).parent().data('fruitType').totalPurchasedCost / $(this).parent().data('fruitType').qtySold;
    }

    $('h2').text('Total Available Cash: $' + customerCash);
  }

  function Fruit(name,price,avgPurchasedCost,qtySold,totalPurchasedCost) {
    this.name=name;
    this.price = price;
    this.avgPurchasedCost = avgPurchasedCost;
    this.qtySold = qtySold;
    this.totalPurchasedCost = totalPurchasedCost;
  }

});
