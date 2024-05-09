const cartSelector = document.getElementById("carrito");
let cartItems = localStorage.getItem("cart");
cartItems = JSON.parse(cartItems);
let c = 0;
favItems = localStorage.getItem("fav");
favItems = JSON.parse(favItems);

function limpiarFavoritos() {
  // Limpiar el localStorage
  if (favItems) {
    localStorage.removeItem("fav");
  }

  let template = `
  <div id="cart">
      <div id="carrito">
          <div id="cart-description">
              <h3>Tus favoritos está vacio</h3>
          </div>
      </div>
      <div id="resumen">
          <h2>Resumen del pedido</h2>
          <div id="resumen-info">
              <h2>Total</h2>
              <h2 id= "total"></h2>
          </div>
          <p>Incluye impuestos 😄</p>
          <a href="./index.html"><button id="resumen-bttn">Ir a comprar</button></a>
      </div>
  </div>`;
  const cleanCart = document.querySelector("#cart-container");
  cleanCart.innerHTML = template;

  // Actualizar la impresión del cuadro de detalle del total (sumando cero)
  document.getElementById("total").textContent = "$0.00";
}
function createCard(producto, c) {
  if (c == 0) {
    return `
    <div id="cart">
        <div id="carrito">
            <img src="${producto.image}" alt="${producto.title}">
            <div id="cart-description">
                <h3>${producto.title}</h3>
                <p id = "${producto.unique}">- ${producto.color}</p>
                <p>${producto.description.slice(0, 50) + "..."}</p>
                <input id="carrito-cantidad" min ="1" type="number" value="${
                  producto.quantity
                }"  onchange ="changeSubtotal(event)"/>
            </div>
            <span id ="${producto.unique}" class ="subtotal-producto"  >$${
      producto.quantity * producto.price
    }</span>
        </div>
        <div id="resumen">
            <h2>Resumen de tus favoritos</h2>
            <div id="resumen-info">
                <h2>Total</h2>
                <h2 id= "total"></h2>
            </div>
            <p>Incluye impuestos 😄</p>
            <button id="resumen-bttn" onclick = "limpiarFavoritos()">Limpiar Favoritos</button>
        </div>
    </div>`;
  } else {
    return `
    <div id="cart">
        <div id="carrito">
            <img src="${producto.image}" alt="${producto.title}">
            <div id="cart-description">
                <h3>${producto.title}</h3>
                <p id = "${producto.unique}">- ${producto.color}</p>
                <p>${producto.description.slice(0, 50) + "..."}</p>
                <input min ="1" id="carrito-cantidad" type="number" value="${
                  producto.quantity
                }" onchange ="changeSubtotal(event)"  />
            </div>
            <span id ="${producto.unique}" class ="subtotal-producto">$${
      producto.quantity * producto.price
    }</span>
        </div>
    </div>`;
  }
}
function changeSubtotal(event) {
  // Obtener el input que disparó el evento
  var input = event.target;

  // Obtener el valor del input
  var cantidad = parseInt(input.value);

  // Obtener el contenedor del producto (div#carrito)
  var carrito = input.closest("#carrito");

  // Obtener el ID único del producto
  var uniqueId = carrito.querySelector(".subtotal-producto").id;

  // Obtener el precio del producto del localStorage usando el ID único
  var favItems = JSON.parse(localStorage.getItem("fav"));
  var producto = favItems.find((item) => item.unique === uniqueId);
  var precio = parseFloat(producto.price);

  // Calcular el nuevo subtotal
  var nuevoSubtotal = cantidad * precio;

  // Actualizar el texto del subtotal
  carrito.querySelector(".subtotal-producto").textContent =
    "$" + nuevoSubtotal.toFixed(0);
  // Actualizar el total sumando todos los subtotales
  var subtotales = document.querySelectorAll(".subtotal-producto");
  var total = 0;
  subtotales.forEach((subtotal) => {
    total += parseFloat(subtotal.textContent.substring(1));
  });
  document.getElementById("total").textContent = "$" + total.toFixed(0);
}
function printCards(arrayOfProducts, idSelector) {
  let totalSum = 0;
  let productsTemplate = "";

  for (let i = 0; i < arrayOfProducts.length; i++) {
    productsTemplate += createCard(arrayOfProducts[i], i);
    totalSum += arrayOfProducts[i].quantity * arrayOfProducts[i].price;
  }
  const productsSelector = document.getElementById(idSelector);
  productsSelector.innerHTML = productsTemplate;

  // Actualiza el elemento con id "total" con la suma total
  document.getElementById("total").textContent = "$" + totalSum;
}
if ((favItems && favItems.length > 0) && favItems != null) {
  printCards(favItems, "cart-container");
} else {
  let template = `
  <div id="cart">
      <div id="carrito">
          <div id="cart-description">
              <h3>Tus favoritos está vacio</h3>
          </div>
      </div>
      <div id="resumen">
          <h2>Resumen de tus favoritos</h2>
          <div id="resumen-info">
              <h2>Total</h2>
              <h2 id= "total"></h2>
          </div>
          <p>Incluye impuestos 😄</p>
          <a href="./index.html"><button id="resumen-bttn">Ir a comprar</button></a>
      </div>
  </div>`;
  const cleanCart = document.querySelector("#cart-container");
  cleanCart.innerHTML = template;

  // Actualizar la impresión del cuadro de detalle del total (sumando cero)
  document.getElementById("total").textContent = "$0.00";
}

let estadoCorazon = localStorage.getItem("heartState");
console.log(estadoCorazon);
