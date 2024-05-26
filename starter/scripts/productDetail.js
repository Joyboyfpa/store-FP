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
    Swal.fire({
      title: "Producto añadido al carrito",
      icon: "success",
      iconColor: "green",
    });
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
    Swal.fire({
      title: "Producto añadido al carrito",
      icon: "success",
      iconColor: "green",
    });

    // Vuelve a guardar el array en el almacenamiento local
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}
function agruparProductosPorIdYColor(productos) {
  const productosAgrupados = {};

  productos.forEach((producto) => {
    const clave = `${producto.color}-${producto.id}`;

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
        unique: clave,
      };
    }
  });

  return Object.values(productosAgrupados);
}
function saveProductAndAgrupar() {
  saveProduct();
  const productos = JSON.parse(localStorage.getItem("cart")); // Obtener productos del carrito
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
  <article id="product-card" class="product-card">
      <a class="product-card" href="./details.html?id=1">
          <img class="product-img" src="./assets/mock1.jpg" alt="Macbook Pro" />
          <div class="product-info">
              <span class="product-title">Macbook Pro 15'4</span>
              <span class="product-description">El MacBook Pro de 15,4 pulgadas tiene una pantalla Retina retroiluminada por LED con tecnología IPS y una resolución nativa de 2880 por 1800 a 220 píxeles por pulgada. El MacBook Pro de 15,4 pulgadas también puede tener una Touch Bar con sensor Touch ID integrado.</span>
              <div class="product-price-block">
                  <span class="price">$750</span>
                  <span class="discount">50% Off</span>
              </div>
              <div class="product-tax-policy">Incluye impuesto País y percepción AFIP</div>
          </div>
      </a>
  </article>
  <article id="product-card" class="product-card">
      <a class="product-card" href="./details.html?id=2">
          <img class="product-img" src="./assets/mock2.jpg" alt="Macbook Pro" />
          <div class="product-info">
              <span class="product-title">Laptop Asus 32'</span>
              <span class="product-description">11 Pro para empresa: Procesador Intel® Core™ i9-13980HX, NVIDIA RTX™ GPU para portátiles de generación Ada 3000, pantalla OLED de 16' 16:10 de 3,2 K y 120 Hz, memoria de dos ranuras SODIMM de hasta 32 GB, hasta 1 TB, dos ranuras M.2 PCIe® SSD, ASUS Dial y Thunderbolt™ 4 USB-C®</span>
              <div class="product-price-block">
                  <span class="price">$1000</span>
                  <span class="discount">20% Off</span>
              </div>
              <div class="product-tax-policy">Incluye impuesto País y percepción AFIP</div>
          </div>
      </a>
  </article>
  <article id="product-card" class="product-card">
      <a class="product-card" href="./details.html?id=5">
          <img class="product-img" src="./assets/mock5.jpg" alt="Macbook Pro" />
          <div class="product-info">
              <span class="product-title">Macbook Pro 15'4</span>
              <span class="product-description">El Samsung Galaxy S23 Plus posee un procesador Qualcomm (SM8550) con una velocidad Octa Core 3.36GHz,2.8GHz,2GHz. ¿Cuántas cámaras tiene el Samsung Galaxy S23 Plus? El Samsung Galaxy S23 Plus cuenta con una cámara frontal de 12MP además de tres cámaras posteriores de 50MP, 10MP y 12MP.</span>
              <div class="product-price-block">
                  <span class="price">$1500</span>
                  <span class="discount">10% Off</span>
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
