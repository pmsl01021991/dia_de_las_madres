const { ref, onValue } = window.firebaseDB;

function loadAdminData() {

  const usersRef = ref(window.db, "usuarios");

  onValue(usersRef, (snapshot) => {

    const users = snapshot.val();

    const usersList = document.getElementById("usersList");

    if (!users) {
      usersList.innerHTML = "<p>No hay usuarios registrados.</p>";
      return;
    }

    usersList.innerHTML = Object.values(users).map(user => `
      <div class="admin-card">
        <h3>${user.name}</h3>
        <p><strong>Usuario:</strong> ${user.user}</p>
        <p><strong>Contraseña:</strong> ${user.pass}</p>
        <p><strong>Fecha:</strong> ${user.createdAt}</p>
      </div>
    `).join("");

  });

}

function clearData() {

  alert("Ahora los datos están en Firebase 😅");

}

function goHome() {
  window.location.href = "index.html";
}

window.addEventListener("load", () => {

  setTimeout(() => {
    loadAdminData();
  }, 500);

});

const interactionsRef = ref(window.db, "interacciones");

onValue(interactionsRef, (snapshot) => {

  const data = snapshot.val();

  const answersList = document.getElementById("answersList");

  if (!data) {
    answersList.innerHTML = "<p>No hay interacciones.</p>";
    return;
  }

  answersList.innerHTML = Object.values(data).reverse().map(item => `
    <div class="admin-card">
      <h3>${item.nombre}</h3>

      <p><strong>Usuario:</strong> ${item.usuario}</p>

      <p><strong>Tipo:</strong> ${item.tipo}</p>

      ${
        item.resultado
        ? `<p><strong>Mensaje:</strong> ${item.resultado}</p>`
        : ""
      }

      ${
        item.regalo
        ? `<p><strong>Regalo:</strong> ${item.regalo}</p>`
        : ""
      }

      <p><strong>Fecha:</strong> ${item.fecha}</p>
    </div>
  `).join("");

});