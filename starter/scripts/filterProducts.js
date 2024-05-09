function captureText(event) {
  const searchValue= event.target.value.toLowerCase();
  const filter = products.filter(product => product.title.toLowerCase().includes(searchValue));
 return printCards(filter, "products");
}
const searchSelector = document.querySelector("#Search");
searchSelector.addEventListener("keyup", (event) => captureText(event));
