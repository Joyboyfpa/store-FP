function createCard(product) {
  return `
  <article id ="product-card" class="product-card">
    <a class="product-card" href="./details.html?id=${product.id}">
      <img class="product-img" src="${product.images[0]}" alt="Macbook Pro" />
      <div class="product-info">
        <span class="product-title">${product.title}</span>
        <span class="product-description">${product.description}</span>
        <div class="product-price-block">
          <span class="price">${"$" + product.price.toString()}</span>
          <span class="discount">${product.discount}</span>
        </div>
        <div class="product-tax-policy">Incluye impuesto País y percepción AFIP</div>
      </div>
    </a>
  </article>`;
}

function printCards(arrayOfProducts, idSelector) {
  let productsTemplate = "";
  for (const element of arrayOfProducts) {
    productsTemplate = productsTemplate + createCard(element);
    const productsSelector = document.getElementById(idSelector);
    productsSelector.innerHTML = productsTemplate;
  }
}
printCards(products, "products");



