
// Formatting string
String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

// Loading Products
var itemBlock = `
  <div class="col-lg-4">
    <div class="card">
      <img src="assets/img/products/{}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{}</h5>
        <p class="card-text">{}</p>
      </div>
    </div>
  </div>`

$.getJSON("./assets/data/products.json", function(products) {
  for (var key in products){
    fileName = products[key]["fileName"];
    productName = products[key]["productName"];
    description = products[key]["description"];

    var newItem = itemBlock.format(fileName, productName, description);
    document.getElementById("productsContainer").innerHTML += newItem;
  }
});
