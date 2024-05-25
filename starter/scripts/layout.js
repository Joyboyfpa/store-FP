const navSelector = document.getElementById("nav");
const options = [
  {
    title: "Ofertas de la semana",
    linkTo: "./outlet.html",
    opts: ["Ofertas de la semana", "Laptops", "Audio", "Auticulares"],
  },
  {
    title: "Celulares",
    linkTo: "./celulares.html",
    opts: ["Cómo comprar", "Formas de pago", "Envios", "Devoluciones"],
  },
  {
    title: "Laptops",
    linkTo: "./laptops.html",
    opts: ["Costos y tarifas", "Impuestos", "Facturación"],
  },
  {
    title: "Soporte",
    linkTo: "./warranty.html",
    opts: ["Mis pedidos", "Pedir nuevamente", "Lista de deseos"],
  },
];
const unordListnav = document.createElement("ul");
const footerSelector = document.querySelector("#footer");
for (let option of options) {
  const list = document.createElement("li");
  const link = document.createElement("a");

  link.className = "nav-button";
  link.href = option.linkTo;
  link.textContent = option.title;

  list.appendChild(link);
  unordListnav.appendChild(list);

  const unordListfooter = document.createElement("ul");
  const footerdivisor = document.createElement("div");
  footerdivisor.className = "col";
  for (let i = 0; i < option.opts.length; i++) {
    const listfooter = document.createElement("li");
    const linkfooter = document.createElement("a");
    if (i === 0) {
      listfooter.className = "col-main-item";
      linkfooter.className = "col-title";
    }
    linkfooter.href = option.linkTo;
    linkfooter.textContent = option.opts[i];

    listfooter.appendChild(linkfooter);
    unordListfooter.appendChild(listfooter);
    footerdivisor.appendChild(unordListfooter);
    footerSelector.appendChild(footerdivisor);
  }
}
navSelector.appendChild(unordListnav);
document.addEventListener("DOMContentLoaded", function () {
  const logoSelector = document.querySelector(".social");
  console.log(localStorage.getItem("isOnline"));
  if (localStorage.getItem("isOnline") === null) {
    localStorage.setItem("isOnline", "false");
  }
  let logoTemplate;
  if (localStorage.getItem("isOnline") == "true") {
    logoTemplate = `<ul>
      <li><a href="#facebook"><i id = "facebook-logo" class="fa-brands fa-facebook"></i></a></li>
      <li><a href="#Instagram"><i id = "ig-logo" class="fa-brands fa-instagram"></i></a></li>
      <li><a href="./cart.html"><i id= "carrito-logo" class="fa-solid fa-cart-shopping"></i></a></li>
      <li><a href="./favorito.html"><i id="heart-logo"class="fa-solid fa-heart"></i></a></li>
      <li><a href=""><i id ="user-checked" class="fa-solid fa-user-check"></i></a></li>
    </ul>`;
  } else {
    logoTemplate = `<ul>
    <li><a href="#facebook"><i id = "facebook-logo" class="fa-brands fa-facebook"></i></a></li>
    <li><a href="#Instagram"><i id = "ig-logo" class="fa-brands fa-instagram"></i></a></li>
      <li><a href=""><i id ="circle-user"  class="fa-solid fa-circle-user"></i></a></li>
    </ul>`;
  }
  logoSelector.innerHTML = logoTemplate;

  const userChecked = document.getElementById("user-checked");
  const circleUser = document.getElementById("circle-user");

  if (userChecked) {
    userChecked.addEventListener("click", function () {
      localStorage.setItem("isOnline", "false");
    });
  }

  if (circleUser) {
    circleUser.addEventListener("click", function () {
      localStorage.setItem("isOnline", "true");
    });
  }
});



// document.addEventListener("DOMContentLoaded", function () {
//   fetchOptions();
//   fetchProducts();
// });
// function fetchOptions() {
//   fetch("options.json")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => renderOptions(data))
//     .catch((error) => console.error("Error fetching options:", error));
// }
// function fetchProducts() {
//   fetch("products.json")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => renderProducts(data))
//     .catch((error) => console.error("Error fetching products:", error));
// }
// function renderOptions(data) {
//   const nav = document.getElementById("nav");
//   const footer = document.getElementById("footer");
//   nav.innerHTML = data.navegacion
//     .map(
//       (navItem) => `<a
//   href="${navItem.enlace}">${navItem.titulo}</a>`
//     )
//     .join(" | ");
//   footer.textContent = data.footer.texto;
// }
// function renderProducts(data) {
//   console.log(data.productos);
//   const productList = document.getElementById("products");
//   productList.innerHTML = data.productos
//     .map(
//       (product) => `
//   <div>
//   <h3>${product.title}</h3>
//   <p>${product.price}€</p>
//   <img src="${product.images}" alt="${product.title}"
  
//   style="width:100px;">
//   </div>
//   `
//     )
//     .join("");
// }
