
// Formatting string
String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

// Loading Products
var itemBlock = `
  <div class="col-lg-4 mb-5">
    <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="assets/img/products/{}" style="width:350px;height:400px">
        </div>
        <div class="flip-card-back">
          <h1>{}</h1>
          <h3>{}</h3>
          <h3>{}</h3>
        </div>
      </div>
    </div>
    <br>
    <button type="button" class="cart" data-toggle="modal" data-target="#exampleModal"  id="{}"
      data-name="{}" data-id="{}" data-src="assets/img/products/{}"
      data-cost="{}" data-desc="{}">
      <img src="./assets/img/more_details.jpg">
    </button>
  </div>`

$.getJSON("./assets/products.json", function(products) {
  for (var key in products){
    fileName = products[key]["fileName"];
    productName = products[key]["productName"];
    description = products[key]["description"];
    price = products[key]["price"];
    status = products[key]["status"];

    var newItem = itemBlock.format(fileName, productName, description, price, key, productName, key, fileName, price, description);
    document.getElementById("productsContainer").innerHTML += newItem;
  }
});

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var cost = button.data('cost')
  var desc = button.data('desc')
  var name = button.data('name')
  var src = button.data('src')
  document.getElementById("product-img").src = src;
  document.getElementById('product-name').innerHTML = name
  document.getElementById('product-cost').innerHTML = cost
  document.getElementById('product-desc').innerHTML = desc
})