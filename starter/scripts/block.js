function dividir(num1, num2, divide) {
  if (isNaN(num1) || isNaN(num2)) {
    alert("Error no numbers.");
    return;
  }
  if (num2 === 0) {
    alert("Error syntasis.");
    return;
  }

  let operacion = num1 / num2;
  divide(operacion);
}

dividir(
  prompt("INSERTE UN NUMERO:"),
  prompt("INSERTE OTRO NUMERO:"),
  function (result) {
    alert("el resultado es: " + result);
  }
);
