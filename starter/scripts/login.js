document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("ingresar");
  const registerButton = document.getElementById("registrate");

  loginButton.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log(email);
    console.log(password);
    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingresa un correo electrónico válido.",
      });
      return;
    }

    if (password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingresa una contraseña.",
      });
      return;
    }

    let userFound = false;
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    console.log(storedUsers);
    storedUsers.forEach(function (storedUser) {
      if (storedUser.email == email && storedUser.password == password) {
        userFound = true;
        return;
      }
    });
    console.log(userFound);
    if (userFound) {
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Inicio de sesión exitoso.",
      });
      localStorage.setItem("isOnline", "true");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 3000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Correo electrónico o contraseña incorrectos.",
      });
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const togglePassword = document.getElementById("toggle_password");

  togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.textContent = "ocultar";
    } else {
      passwordInput.type = "password";
      togglePassword.textContent = "mostrar";
    }
  });
});
