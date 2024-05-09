const cartSelector = document.getElementById("carrito");
let cartItems = localStorage.getItem("cart");
cartItems = JSON.parse(cartItems);
let favoritosActual = localStorage.getItem("heartState");

let c = 0;
function favoritos(uniqueId) {
  // Obtener los elementos favoritos del localStorage
  let favItems = localStorage.getItem("fav");
  let favoritosActual = localStorage.getItem("heartState");
  // Verificar si ya existen elementos favoritos
  if (favItems) {
    favItems = JSON.parse(favItems);

    // Verificar si el producto ya está en la lista de favoritos
    const existingItemIndex = favItems.findIndex(
      (item) => item.unique === uniqueId
    );
    if (existingItemIndex !== -1) {
      console.log(
        "El producto ya está en la lista de favoritos. Se procede a eliminarlo"
      );
      favItems.splice(existingItemIndex, 1);
      localStorage.setItem("fav", JSON.stringify(favItems));
      return;
    }
  } else {
    favItems = [];
    // favoritoArray = [];
    // let corazon = document.querySelectorAll("#favorite-heart");
    // corazon.forEach((corazones) => {
    //   let padre = corazones.parentNode;
    //   favoritoArray.push({ unique: padre.classList.value });
    // });
    // localStorage.setItem("heartState", JSON.stringify(favoritoArray));
    // corazon.forEach((item) => {
    //   item.classList.toggle("clicked");
    // });
  }

  // Si el producto no está en la lista de favoritos, agregarlo
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);

  // Filtrar los elementos del carrito para excluir el producto que se va a borrar
  const newItem = cartItems.find((item) => item.unique === uniqueId);
  if (newItem) {
    favItems.push(newItem);
    localStorage.setItem("fav", JSON.stringify(favItems));
    console.log("Producto agregado a la lista de favoritos.");
  } else {
    console.log("El producto que intentas agregar no existe.");
  }

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

function limpiarCarrito() {
  // Limpiar el localStorage
  if (cartItems) {
    localStorage.removeItem("cart");
  }

  let template = `
  <div id="cart">
      <div id="carrito">
          <div id="cart-description">
              <h3>El carrito está vacio</h3>
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
            <span id ="${producto.unique}" class ="subtotal-producto">$${
      producto.quantity * producto.price
    }</span>
        <div id = "div-favorite" class = "${producto.unique}">
          <i id= "favorite-heart" class="fa-solid fa-heart" onclick="favoritos('${
            producto.unique
          }')"></i>
        </div>
        </div>
        <div id="resumen">
            <h2>Resumen del pedido</h2>
            <div id="resumen-info">
                <h2>Total</h2>
                <h2 id= "total"></h2>
            </div>
            <p>Incluye impuestos 😄</p>
            <button id="resumen-bttn" onclick = "limpiarCarrito()">Finalizar Compra</button>
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
    <div id = "div-favorite" class = "${producto.unique}">
          <i id= "favorite-heart" class="fa-solid fa-heart" onclick="favoritos('${
            producto.unique
          }')"></i>
        </div>
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
  var cartItems = JSON.parse(localStorage.getItem("cart"));
  var producto = cartItems.find((item) => item.unique === uniqueId);
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
if (cartItems) {
  printCards(cartItems, "cart-container");
} else {
  let template = `
  <div id="cart">
      <div id="carrito">
          <div id="cart-description">
              <h3>El carrito está vacio</h3>
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
// document.getElementById("favorite-heart").addEventListener("click", function() {
//   this.classList.toggle("clicked");

//   // Verificar si el corazón no tiene la clase "clicked"
//   if (!this.classList.contains("clicked")) {
//     // Obtener los elementos favoritos del localStorage
//     let favItems = localStorage.getItem("fav");

//     // Verificar si hay elementos favoritos en el localStorage
//     if (favItems) {
//       // Convertir la cadena JSON en un arreglo de objetos
//       favItems = JSON.parse(favItems);

//       // Encontrar el índice del elemento actual en el arreglo de favoritos
//       const indexToRemove = favItems.findIndex(item => item.unique === "3-Green"); // Suponiendo que el uniqueId sea "3-Green"

//       // Si se encuentra el elemento en el arreglo de favoritos, removerlo
//       if (indexToRemove !== -1) {
//         favItems.splice(indexToRemove, 1); // Remover el elemento del arreglo
//         localStorage.setItem("fav", JSON.stringify(favItems)); // Actualizar el localStorage
//         console.log("Elemento eliminado de favoritos.");
//       }
//     }
//   }
// });
// localStorage.removeItem("heartState");
