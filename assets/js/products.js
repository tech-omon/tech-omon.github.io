
// Formatting string
String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};

// Not Found
const noProducts = `
  <div class="col">
    <div class="card">
      <img src="assets/img/not-found.jpg" class="card-img-top">
      <div class="card-body text-center">
        <h5 class="card-title">Products Coming Soon!</h5>
      </div>
    </div>
  </div>`

// Loading Products
const itemBlock = `
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
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  let [category, subCategory] = params.filter?.split('/') || ['', '']
  if (!subCategory) { subCategory = '' }

  updateNavbar(category, subCategory)

  let displayItemcount = 0;
  for (let key in products) {
    fileName = products[key]["fileName"];
    title = products[key]["Title"];
    description = `${products[key]["Dimension"]} <br> ${products[key]["Media"]}`;

    if (
      !products[key]['Category'].startsWith(category) ||
      !products[key]['SubCategory'].startsWith(subCategory)
    ) continue;

    displayItemcount += 1;
    if (displayItemcount > 150) break

    var newItem = itemBlock.format(fileName, title, description);
    document.getElementById("productsContainer").innerHTML += newItem;
  }

  if (!displayItemcount) {
    document.getElementById("productsContainer").innerHTML = noProducts;
  }
});

function updateNavbar(category, subCategory) {
  if (!category) { category = "Everything"}
  console.log(category, subCategory)
  document.getElementById(category).classList.remove('collapsed')
  if (subCategory) {
    document.getElementById(`${category}-nav`).classList.remove('collapse')
    document.getElementById(`${category}-nav`).classList.add('show')
    document.getElementById(subCategory).classList.add('active')
  }
}