class StorageManager {
  static getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }

  static saveAnswer(answer) {
    const answers = JSON.parse(localStorage.getItem("answers")) || [];
    answers.push(answer);
    localStorage.setItem("answers", JSON.stringify(answers));
  }
}

class MessageManager {
  static generateMessage() {
    const q1 = document.getElementById("q1").value;
    const q2 = document.getElementById("q2").value;
    const q3 = document.getElementById("q3").value;

    const currentUser = StorageManager.getCurrentUser();

    const message = `
      Eres una persona ${q1}, con un corazón lleno de luz.
      Para ti, lo más importante es ${q2}, y eso demuestra la belleza de tu alma.
      Hoy mereces sentirte ${q3}, porque tu presencia hace que cada momento sea más especial.
      Gracias por ser una madre maravillosa, fuerte y llena de amor.
    `;

    const result = document.getElementById("resultMessage");
    const palabras = message.trim().split(/\s+/);
    result.innerHTML = `
      <p class="mensaje-animado">
        ${palabras.map((palabra, index) =>
          `<span style="animation-delay:${index * 0.55}s">${palabra}</span>`
        ).join(" ")}
      </p>
    `;
    result.classList.remove("hidden");
    
    // MÚSICA
    const audio = new Audio("audio/musica2.mp3");
    audio.volume = 0.5;
    audio.play();
    
    // VOZ
    if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
    
      const voz = new SpeechSynthesisUtterance(message);
    
      voz.lang = "es-ES";
      voz.rate = 0.95;
      voz.pitch = 1.1;
      voz.volume = 1;
    
      // Espera un poquito para que primero suene la música
      setTimeout(() => {
        speechSynthesis.cancel();
        speechSynthesis.speak(voz);
      }, 300);
    
    }

    StorageManager.saveAnswer({
      user: currentUser ? currentUser.user : "Invitado",
      name: currentUser ? currentUser.name : "Invitado",
      type: "mensaje",
      answers: {
        descripcion: q1,
        importancia: q2,
        emocion: q3
      },
      result: message,
      date: new Date().toLocaleString()
    });
  }
}

class GiftManager {
  static generateGiftCard() {
    const gift = document.getElementById("giftInput").value.trim();

    if (!gift) {
      Swal.fire("Escribe tu regalo", "Cuéntanos qué regalo hubieras querido tener", "warning");
      return;
    }

    const currentUser = StorageManager.getCurrentUser();

    const text = `
      Aunque ese regalo no haya llegado antes, hoy queda guardado como un sueño bonito de tu corazón.
      Mereces eso y mucho más, porque una madre como tú merece amor, detalles y felicidad todos los días. 💝
    `;

    const giftResult = document.getElementById("giftResult");

    giftResult.innerHTML = `
      <h3>Tu regalo soñado</h3>
      <p><strong>${gift}</strong></p>
      <p>${text}</p>
    `;

    giftResult.classList.remove("hidden");

    StorageManager.saveAnswer({
      user: currentUser ? currentUser.user : "Invitado",
      name: currentUser ? currentUser.name : "Invitado",
      type: "regalo",
      gift: gift,
      result: text,
      date: new Date().toLocaleString()
    });
  }
}

class NavbarManager {
  static loadUserName() {
    const currentUser = StorageManager.getCurrentUser();
    const title = document.getElementById("navbarTitle");

    if (currentUser && title) {
      title.innerHTML = `🌸 Para ti <span class="nombre-user">${currentUser.name}</span> una Mamá amada`;
    }
  }
}

class HeroEffects {
  static init() {
    const hero = document.getElementById("hero");
    const parallaxFlores = document.querySelector(".parallax-flores");

    if (!hero || !parallaxFlores) return;

    hero.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 25;
      const y = (e.clientY / window.innerHeight - 0.5) * 25;

      parallaxFlores.style.transform = `translate(${x}px, ${y}px)`;
    });

    hero.addEventListener("mouseleave", () => {
      parallaxFlores.style.transform = "translate(0, 0)";
    });

    hero.addEventListener("click", (e) => {
      this.createHeart(e.clientX, e.clientY);
    });
  }

  static createHeart(x, y) {
    const heart = document.createElement("div");
    const hearts = ["💖", "💕", "💗", "💓", "💘", "💝"];

    heart.className = "click-heart";
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = x + "px";
    heart.style.top = y + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1400);
  }
}

class App {
  static init() {
    NavbarManager.loadUserName();
    HeroEffects.init();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  App.init();
});

function generateMessage() {
  MessageManager.generateMessage();
}

function generateGiftCard() {
  GiftManager.generateGiftCard();
}

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    card.addEventListener("click", () => {
  
      card.classList.add("click-anim");
  
      const audio = new Audio("audio/musica.mp3");
      audio.volume = 0.5;
      audio.play();
  
      // TEXTO DE LA TARJETA
      const texto = card.querySelector("p").innerText;
  
      // VOZ
      const voz = new SpeechSynthesisUtterance(texto);
  
      voz.lang = "es-ES";
      voz.rate = 0.75;
      voz.pitch = 1.1;
      voz.volume = 1;
  
      speechSynthesis.cancel();
      speechSynthesis.speak(voz);
  
      setTimeout(() => {
        card.classList.remove("click-anim");
      }, 700);
  
    });
  
  });
});