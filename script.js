$(function () {

//Variables declared here
  var fruitPrice = randomNumber(-.5,.5);
  var customerCash = 100;
  var apple = new Fruit('apple',randomNumber(1,2),0,0,0);
  var orange = new Fruit('orange',randomNumber(1,2),0,0,0);
  var banana = new Fruit('banana',randomNumber(1,2),0,0,0);
  var pear = new Fruit('pear',randomNumber(1,2),0,0,0);

//Sets and displays initial price on the DOM
  var fruits = [apple, orange, banana, pear];
for (var j = 0; j < fruits.length; j++){
  displayCurrPrice(fruits[j].name, fruits[j].price);
}

//Change prices every 15 seconds
setInterval(function() { changePrice(fruits)}, 15000);

//Display purchase information when mouse hovers on each fruit image
$('.fruitimage').on('mouseenter', function() {
$(this).closest('.box').find('.info').toggleClass('hidden');

});

//Hides purchase information on mouseleave
$('.fruitimage').on('mouseleave', function(){

  $(this).closest('.box').find('.info').toggleClass('hidden');

})

//Updates the Total Available Cash at the top of the page when purchases are made
  $('h2').text('Total Available Cash: $' + parseFloat(customerCash.toFixed(2)));

//Associating .data tags to each fruit
  $('.apple').data('fruitType', apple);
  $('.orange').data('fruitType', orange);
  $('.banana').data('fruitType', banana);
  $('.pears').data('fruitType', pear);


//Buy button functionality
  $('.fruit').on('click', '.btn', buyFruit);

//Random number generator for price changes
  function randomNumber(min, max) {
  	return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  }

//For loop that sets fruit price between $0.5-11.50
  function changePrice(array) {

    for (var i = 0; i < array.length; i++) {
      if (array[i].price + fruitPrice < .5) {
        array[i].price = .5;
      } else if (array[i].price + fruitPrice > 11.50) {
        array[i].price = 11.50;
      } else {
        array[i].price += fruitPrice;
      }

      //Displays current price which updates with the setInterval function
      displayCurrPrice(array[i].name, array[i].price)
      fruitPrice= randomNumber(-.5,.5);
    }

    }

  function buyFruit() {

    if (customerCash - $(this).parent().data('fruitType').price < 0){

//If statement that disallows purchases if customer does not have enough money
      alert('You dont have enough cash to make this purchase');
    } else {
      //Subtracts current fruit price from total customer cash
      customerCash -= $(this).parent().data('fruitType').price;

      //Increments qtySold when buy button is clicked
      $(this).parent().data('fruitType').qtySold++;

      //Total purchase cost used in average calc
      $(this).parent().data('fruitType').totalPurchasedCost += $(this).parent().data('fruitType').price;

      //Average calc
      $(this).parent().data('fruitType').avgPurchasedCost = $(this).parent().data('fruitType').totalPurchasedCost / $(this).parent().data('fruitType').qtySold;

      //Appends text with fruit name and amount purchased
      $(this).parent().find('.totalpurchased').text('Total ' + $(this).parent().data('fruitType').name + 's purchased: ' + $(this).parent().data('fruitType').qtySold);

      //Appends text with average purchase cost
      $(this).parent().find('.averageprice').text('Average Purchased Cost: $' + $(this).parent().data('fruitType').avgPurchasedCost.toFixed(2));


    }

    //Appends text at top of page with customer's total cash available
    $('h2').text('Total Available Cash: $' + parseFloat(customerCash.toFixed(2)));
  }

  //Constructor
  function Fruit(name,price,avgPurchasedCost,qtySold,totalPurchasedCost) {
    this.name = name;
    this.price = price;
    this.avgPurchasedCost = avgPurchasedCost;
    this.qtySold = qtySold;
    this.totalPurchasedCost = totalPurchasedCost;
  }

//Function used in displaying initial fruit cost
function displayCurrPrice(fruitname, fruitprice){
  $('.' + fruitname + 'cost').text("Current Cost: $" + fruitprice.toFixed(2));
}
});
