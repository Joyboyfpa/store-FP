const cartSelector = document.getElementById("carrito");
let cartItems = localStorage.getItem("cart");
cartItems = JSON.parse(cartItems);
let favoritosActual = localStorage.getItem("heartState");

let c = 0;
function favoritos(uniqueId) {
  // Obtener los elementos favoritos del localStorage
  let favItems = localStorage.getItem("fav");
  // Verificar si ya existen elementos favoritos
  if (favItems) {
    favItems = JSON.parse(favItems);

    // Verificar si el producto ya está en la lista de favoritos
    const existingItemIndex = favItems.findIndex(
      (item) => item.unique === uniqueId
    );
    console.log(existingItemIndex);
    if (existingItemIndex !== -1) {
      Swal.fire({
        title: "Info",
        text: "El producto ya está en la lista de favoritos. Se procede a eliminarlo de los favoritos",
        icon: "warning",
        iconColor: "red",
      });
      favItems.splice(existingItemIndex, 1);
      localStorage.setItem("fav", JSON.stringify(favItems));
      return;
    }
  } else {
    favItems = [];
  }

  // Si el producto no está en la lista de favoritos, agregarlo
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);

  // Filtrar los elementos del carrito para excluir el producto que se va a borrar
  const newItem = cartItems.find((item) => item.unique === uniqueId);
  if (newItem) {
    favItems.push(newItem);
    localStorage.setItem("fav", JSON.stringify(favItems));
    console.log("");
    Swal.fire({
      title: "Info",
      text: "Producto agregado a la lista de favoritos.",
      icon: "success",
      iconColor: "green",
    });
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
function validarCompra() {
  Swal.fire({
    title: "¿Confirmar compra?",
    icon: "question",
    iconColor: "green",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: "confirmar",
    cancelButtonText: "cancelar",
    confirmButtonColor: "blue",
    cancelButtonColor: "red",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({ title: "Compra realizada!" });
      limpiarCarrito();
    }
  });
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
            <button id="resumen-bttn" onclick = "validarCompra()">Finalizar Compra</button>
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

function heartState() {
  let favItems = localStorage.getItem("fav");
  // Verificar si hay elementos en favItems
  if (favItems) {
    favItems = JSON.parse(favItems);
    // Iterar sobre cada elemento en favItems
    favItems.forEach((item) => {
      let unico = item.unique;
      console.log(unico);
      var selector = "." + unico;
      console.log(selector);
      // Buscar el div con la clase correspondiente a "unico"
      var elemento = document.querySelector(selector);
      console.log(elemento);
      // Verificar si se encontró el div
      if (elemento) {
        // Buscar el elemento <i> dentro del div
        var elementoI = elemento.querySelector("i");
        // Verificar si se encontró el elemento <i>
        if (elementoI) {
          // Alternar la clase "clicked" en el elemento <i>
          elementoI.classList.toggle("clicked");
        } else {
          console.error("No se encontró el elemento <i> dentro de:", elemento);
        }
      } else {
        console.error("No se encontró el div con la clase:", unico);
      }
    });
  } else {
    console.log("No hay elementos guardados en el localStorage.");
  }
}
// Función para manejar el clic en el elemento <i>
function handleItemClick(event) {
  // Obtener el elemento <i> que se hizo clic
  var elementoI = event.target;
  // Alternar la clase "clicked" en el elemento <i>
  elementoI.classList.toggle("clicked");
}

// Obtener todos los elementos <i> y agregar un listener para el clic
var elementosI = document.querySelectorAll("i");
elementosI.forEach((elementoI) => {
  elementoI.addEventListener("click", handleItemClick);
  console.log(elementoI);
});
heartState();
