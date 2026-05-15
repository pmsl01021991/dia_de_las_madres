function loadAdminData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const answers = JSON.parse(localStorage.getItem("answers")) || [];

  const usersList = document.getElementById("usersList");
  const answersList = document.getElementById("answersList");

  if (users.length === 0) {
    usersList.innerHTML = "<p>No hay usuarios registrados.</p>";
  } else {
    usersList.innerHTML = users.map(user => `
      <div class="admin-card">
        <h3>${user.name}</h3>
        <p><strong>Usuario:</strong> ${user.user}</p>
        <p><strong>Contraseña:</strong> ${user.pass}</p>
        <p><strong>Fecha:</strong> ${user.createdAt}</p>
      </div>
    `).join("");
  }

  if (answers.length === 0) {
    answersList.innerHTML = "<p>No hay respuestas guardadas.</p>";
  } else {
    answersList.innerHTML = answers.map(answer => `
      <div class="admin-card">
        <h3>${answer.name}</h3>
        <p><strong>Usuario:</strong> ${answer.user}</p>
        <p><strong>Tipo:</strong> ${answer.type}</p>
        <p><strong>Resultado:</strong> ${answer.result}</p>
        ${answer.gift ? `<p><strong>Regalo:</strong> ${answer.gift}</p>` : ""}
        <p><strong>Fecha:</strong> ${answer.date}</p>
      </div>
    `).join("");
  }
}

function clearData() {
  const confirmDelete = confirm("¿Seguro que deseas borrar todos los datos?");

  if (confirmDelete) {
    localStorage.removeItem("users");
    localStorage.removeItem("answers");
    localStorage.removeItem("currentUser");
    location.reload();
  }
}

function goHome() {
  window.location.href = "index.html";
}

loadAdminData();