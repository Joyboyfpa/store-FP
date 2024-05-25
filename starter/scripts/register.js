document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("ingresar");
  const registerButton = document.getElementById("registrate");

  registerButton.addEventListener("click", function () {
    const email = emailInput.value;
    const password = passwordInput.value;

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

    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El correo electrónico ya está registrado.",
      });
    } else {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El correo electrónico ya está registrado.",
        });
      } else {
        users.push({ email: email, password: password });
        localStorage.setItem("users", JSON.stringify(users));
        Swal.fire({
          icon: "success",
          title: "¡Registro exitoso!",
          text: "Redireccionando.",
        });
        localStorage.setItem("isOnline", "true");
        setTimeout(function () {
          window.location.href = "index.html";
        }, 3000);
      }
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
