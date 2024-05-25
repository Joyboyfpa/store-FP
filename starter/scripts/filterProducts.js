function captureText(event) {
  const searchValue = event.target.value.toLowerCase();
  const filter = products.filter((product) =>
    product.title.toLowerCase().includes(searchValue)
  );
  const order = filter.sort((a, b) => b.title.localeCompare(a.title));
  return printCards(order, "products");
}
const searchSelector = document.querySelector("#Search");
searchSelector.addEventListener("keyup", (event) => captureText(event));
