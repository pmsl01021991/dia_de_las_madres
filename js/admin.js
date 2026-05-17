function loadAdminData() {

  const { ref, onValue } = window.firebaseDB;

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