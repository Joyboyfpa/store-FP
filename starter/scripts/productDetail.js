const query = location.search;
const params = new URLSearchParams(query);
const id = params.get("id");
console.log(id);
function changeMini(event) {
  const selectedSrc = event.target.src;
  const bigSelector = document.querySelector("#bigImg");
  bigSelector.src = selectedSrc;
}
function changeSubtotal(event) {
  const product = products.find((each) => each.id == id);
  const selectedValue = parseInt(event.target.value);
  const priceSelector = document.querySelector(".checkout-total-price");
  const total = parseInt(product.price) * selectedValue;
  priceSelector.innerHTML = "$" + total.toString();
}
function saveProduct() {
  const found = products.find((each) => each.id == id);
  const product = {
    id: id,
    title: found.title,
    price: found.price,
    image: found.images[0],
    description: found.description,
    color: document.querySelector("#color-" + id).value,
    quantity: document.querySelector("#quantity-" + id).value,
  };
  let cartItems = localStorage.getItem("cart");
  // Si no hay ningún elemento en el carrito
  if (!cartItems) {
    // Crea un nuevo array con el producto y guárdalo en el almacenamiento local
    localStorage.setItem("cart", JSON.stringify([product]));
  } else {
    // Si hay elementos en el carrito, convierte la cadena JSON a un array
    cartItems = JSON.parse(cartItems);

    // Agrega el nuevo producto al array existente
    if (!Array.isArray(cartItems)) {
        // Si lo que recuperamos del almacenamiento no es un array, tratamos de arreglarlo
        cartItems = [cartItems];
      }
  
      // Agrega el nuevo producto al array existente
      cartItems.push(product);

    // Vuelve a guardar el array en el almacenamiento local
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}
function agruparProductosPorIdYColor(productos) {
  const productosAgrupados = {};

  productos.forEach((producto) => {
    const clave = `${producto.id}-${producto.color}`;

    if (productosAgrupados[clave]) {
      productosAgrupados[clave].quantity += parseInt(producto.quantity);
    } else {
      productosAgrupados[clave] = {
        id: producto.id,
        title: producto.title,
        price: producto.price,
        image: producto.image,
        description: producto.description,
        color: producto.color,
        quantity: parseInt(producto.quantity),
        unique: clave
      };
    }
  });

  return Object.values(productosAgrupados);
}
function saveProductAndAgrupar() {
  saveProduct();
  const productos = JSON.parse(localStorage.getItem('cart')); // Obtener productos del carrito
  const productosAgrupados = agruparProductosPorIdYColor(productos);
  localStorage.setItem("cart", JSON.stringify(productosAgrupados)); // Guardar productos agrupados en el localStorage
}

function printDetails(id) {
  const product = products.find((each) => each.id == id);
  const detailsTemplate = `<div class="columns-container">
  <div class="product-images-block">
      <img id="bigImg" class="main-image" src="${
        product.images[0]
      }" alt="Descripción de la imagen 1" />
      <div class="thumbnail-container">
          ${product.images
            .map(
              (each) =>
                `<img class="miniImg" src="${each}" alt="mini" onclick = changeMini(event) />`
            )
            .join("")}
      </div>
  </div>

  <div class="product-description-block">
      <h1 class="title">${product.title}</h1>
      <form class="selector">
          <fieldset>
              <label class="label" for="color">Color: </label>
              <select id="color-${
                product.id
              }" type="text" placeholder="Selecciona un color">
                  ${product.colors
                    .map((each) => `<option value=${each}>${each}</option>`)
                    .join("")}
              </select>
          </fieldset>
      </form>
      <div class="product-description-block">
          <h1>Descripcion:</h1>
          <p>${product.description}</p>
      </div>
  </div>
  <div class="product-checkout-block">
      <div class="checkout-container">
          <span class="checkout-total-label">Total:</span>
          <h2 class="checkout-total-price">${
            "$" + product.price.toString()
          }</h2>
          <p class="checkout-description">
              Incluye impuesto PAIS y percepción AFIP. Puedes recuperar $50711
              haciendo la solicitud en AFIP.
          </p>
          <ul class="checkout-policy-list">
              <li>
                  <span class="policy-icon"><img src="assets/truck.png" alt="Truck" /></span>
                  <span class="policy-desc"> Agrega el producto al carrito para conocer los costos de envío</span>
              </li>
              <li>
                  <span class="policy-icon"><img src="assets/plane.png" alt="Plane" /></span>
                  <span class="policy-desc"> Recibí aproximadamente entre 10 y 15 días hábiles, seleccionando
                      envío normal</span>
              </li>
          </ul>
          <div class="checkout-process">
              <div class="top">
                  <input id="quantity-${
                    product.id
                  }" type="number" min="1" value="1" onchange = "changeSubtotal(event)" />
                  <button class="btn-outline" onclick = "saveProductAndAgrupar()" >Añadir al Carrito</button>
              </div>
              <div class="bottom">
              <a class="logo" href="./cart.html"><button  class="btn-primary">Comprar</button></a>
              </div>
          </div>
      </div>
  </div>
</div>
<div class="sales-block">
  <h2>Ofertas Destacadas</h2>
  <article class="product-card">
      <a class="product-card" href="./details.html">
          <img class="product-img" src="assets\mock1.jpg" alt="Macbook Pro" />
          <div class="product-info">
              <span class="product-title">Macbook Pro 15'4</span>
              <span class="product-description">Space Gray</span>
              <div class="product-price-block">
                  <span class="price">$750.000</span>
                  <span class="discount">50% Off</span>
              </div>
              <div class="product-tax-policy">Incluye impuesto País y percepción AFIP</div>
          </div>
      </a>
  </article>
  <article class="product-card">
      <a class="product-card" href="./details.html">
          <img class="product-img" src="assets\mock1.jpg" alt="Macbook Pro" />
          <div class="product-info">
              <span class="product-title">Macbook Pro 15'4</span>
              <span class="product-description">Space Gray</span>
              <div class="product-price-block">
                  <span class="price">$750.000</span>
                  <span class="discount">50% Off</span>
              </div>
              <div class="product-tax-policy">Incluye impuesto País y percepción AFIP</div>
          </div>
      </a>
  </article>
  <article class="product-card">
      <a class="product-card" href="./details.html">
          <img class="product-img" src="assets\mock1.jpg" alt="Macbook Pro" />
          <div class="product-info">
              <span class="product-title">Macbook Pro 15'4</span>
              <span class="product-description">Space Gray</span>
              <div class="product-price-block">
                  <span class="price">$750.000</span>
                  <span class="discount">50% Off</span>
              </div>
              <div class="product-tax-policy">Incluye impuesto País y percepción AFIP</div>
          </div>
      </a>
  </article>
</div>
 `;
  const detailsSelector = document.querySelector("#product-detail");
  detailsSelector.innerHTML = detailsTemplate;
}

printDetails(id);
