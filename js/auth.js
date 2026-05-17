function showRegister() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerBox").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}

function register() {
  const name = document.getElementById("regName").value.trim();
  const user = document.getElementById("regUser").value.trim();
  const pass = document.getElementById("regPass").value.trim();

  if (!name || !user || !pass) {
    Swal.fire("Faltan datos", "Completa todos los campos", "warning");
    return;
  }

  const { ref, get, set } = window.firebaseDB;

  const safeUser = user.replaceAll(".", "_");
  const userRef = ref(window.db, "usuarios/" + safeUser);

  get(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      Swal.fire("Usuario existente", "Ese usuario ya está registrado", "error");
      return;
    }

    const newUser = {
      name: name,
      user: user,
      pass: pass,
      createdAt: new Date().toLocaleString()
    };

    set(userRef, newUser).then(() => {
      Swal.fire("Cuenta creada", "Ahora puedes iniciar sesión", "success");

      showLogin();

      document.getElementById("regName").value = "";
      document.getElementById("regUser").value = "";
      document.getElementById("regPass").value = "";
    });
  });
}

function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (user === "admin" && pass === "1234pmsl") {
    window.location.href = "admin.html";
    return;
  }

  const { ref, get } = window.firebaseDB;

  const safeUser = user.replaceAll(".", "_");
  const userRef = ref(window.db, "usuarios/" + safeUser);

  get(userRef).then((snapshot) => {
    if (!snapshot.exists()) {
      Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
      return;
    }

    const foundUser = snapshot.val();

    if (foundUser.pass !== pass) {
      Swal.fire("Error", "Usuario o contraseña incorrectos", "error");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    if (typeof NavbarManager !== "undefined") {
      NavbarManager.loadUserName();
    }

         try {
            Swal.fire({
              title: `Bienvenida ${foundUser.name} 💖`,
              html: `
                <div class="popup-madres">
                  <img 
                    src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80" 
                    class="popup-img"
                  >
                  <p class="popup-text">
                    Esta experiencia fue creada con mucho cariño para ti.
                  </p>
                  <div class="popup-hearts">
                    💖 💕 💗 💓 💘
                  </div>
                </div>
              `,
              showClass: {
                popup: "animate__animated animate__zoomIn"
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutDown"
              },
              confirmButtonText: "Comenzar",
              confirmButtonColor: "#d63384",
              background: "#fff7fb",
              customClass: {
                popup: "swal-popup-madres",
                title: "swal-title-madres",
                confirmButton: "swal-button-madres"
              }
            });
          } catch (error) {
            console.log("Error en popup:", error);
          }

          }).catch((error) => {
          alert("Error al iniciar sesión: " + error.message);

        });
      }

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

window.addEventListener("load", () => {
  const currentUser = localStorage.getItem("currentUser");

  if (currentUser && document.getElementById("mainPage")) {
    document.getElementById("authSection").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    if (typeof NavbarManager !== "undefined") {
      NavbarManager.loadUserName();
    }
  }
});