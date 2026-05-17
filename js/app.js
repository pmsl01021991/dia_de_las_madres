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
          `<span style="animation-delay:${index * 0.41}s">${palabra}</span>`
        ).join(" ")}
      </p>
    `;
    result.classList.remove("hidden");
    
    // MÚSICA
    const audio = new Audio("audio/musica2.mp3");
    audio.volume = 0.5;
    audio.play().catch(() => {});
    
    // VOZ
    if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
    
      const voz = new SpeechSynthesisUtterance(message);
    
      voz.lang = "es-ES";
      voz.rate = 0.75;
      voz.pitch = 1.1;
      voz.volume = 1;
    
      // Espera un poquito para que primero suene la música
      setTimeout(() => {
        speechSynthesis.cancel();

        try {
          speechSynthesis.speak(voz);
        } catch(e) {}
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

    const { ref, push } = window.firebaseDB;

    push(ref(window.db, "interacciones"), {
      tipo: "mensaje",
      usuario: currentUser ? currentUser.user : "Invitado",
      nombre: currentUser ? currentUser.name : "Invitado",
      resultado: message,
      fecha: new Date().toLocaleString()
    });
  }
}

class GiftManager {

  static generateGiftCard() {

    const gift = document.getElementById("giftInput").value.trim();

    if (!gift) {
      Swal.fire(
        "Escribe tu regalo 💖",
        "Cuéntanos qué regalo hubieras querido tener",
        "warning"
      );
      return;
    }

    const giftResult = document.getElementById("giftResult");

    // IMÁGENES SEGÚN PALABRA
    const imagenes = {

      viajar: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",

      casa: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",

      carro: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80",

      flores: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=80",

      amor: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=80",

      celular: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",

      joyas: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",

      ropa: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80"

    };

    // MENSAJES ESPECIALES
    const mensajes = {

      viajar:
        "Porque cada lugar nuevo sería una aventura y un recuerdo hermoso para tu corazón ✈️",

      casa:
        "Porque mereces un lugar lleno de paz, amor y felicidad 🏡",

      carro:
        "Porque mereces comodidad y llegar a todos lados con una sonrisa 🚗",

      flores:
        "Porque una mujer tan especial merece belleza todos los días 🌸",

      amor:
        "Porque el amor verdadero siempre será el regalo más valioso 💖",

      celular:
        "Porque mereces comunicarte y guardar recuerdos hermosos 📱",

      joyas:
        "Porque brillas tanto como las piedras más preciosas 💎",

      ropa:
        "Porque mereces sentirte hermosa y especial siempre 👗"

    };

    // SI NO EXISTE
    const imagen =
      imagenes[gift.toLowerCase()] ||
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80";

    const mensaje =
      mensajes[gift.toLowerCase()] ||
      `Cierra los ojos por un instante e imagina que "${gift}" está frente a ti 
      Esta página fue creada para regalarte sonrisas, emociones y hacerte sentir especial,
      porque una mamá como tú merece recibir cosas maravillosas todos los días `;

    giftResult.innerHTML = `

      <div class="dream-card animate__animated animate__zoomIn">

        <img src="${imagen}" class="dream-img">

        <div class="dream-overlay">

          <h3>Tu regalo soñado es...</h3>

          <h1>${gift}</h1>

          <p>${mensaje}</p>

          <div class="dream-hearts">
            💖 💕 💗 💓 💘
          </div>

          <span class="dream-final">
            Eres una mamá increíble 🌸
          </span>

        </div>

      </div>

    `;

    giftResult.classList.remove("hidden");

    // SONIDO
    const audio = new Audio("audio/musica.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});

    // VOZ
    const voz = new SpeechSynthesisUtterance(
      `Tu regalo soñado es ${gift}. ${mensaje}`
    );

    voz.lang = "es-ES";
    voz.rate = 0.55;
    voz.pitch = 1.1;

    speechSynthesis.cancel();

    try {
      speechSynthesis.speak(voz);
    } catch(e) {}

    const currentUser = StorageManager.getCurrentUser();

    const { ref, push } = window.firebaseDB;

    push(ref(window.db, "interacciones"), {
      tipo: "regalo",
      usuario: currentUser ? currentUser.user : "Invitado",
      nombre: currentUser ? currentUser.name : "Invitado",
      regalo: gift,
      fecha: new Date().toLocaleString()
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


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    card.addEventListener("click", () => {
  
      card.classList.add("click-anim");
  
      const audio = new Audio("audio/musica.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {});
  
      // TEXTO DE LA TARJETA
      const texto = card.querySelector("p").innerText;
  
      // VOZ
      const voz = new SpeechSynthesisUtterance(texto);
  
      voz.lang = "es-ES";
      voz.rate = 0.75;
      voz.pitch = 1.1;
      voz.volume = 1;

      speechSynthesis.cancel();
  
      try {
        speechSynthesis.speak(voz);
      } catch(e) {}
  
      setTimeout(() => {
        card.classList.remove("click-anim");
      }, 700);
  
    });
  
  });
});

class FamilyManager {

  static showCustomizer() {

    const customizer =
      document.getElementById("husbandCustomizer");

    customizer.classList.remove("hidden");

    FamilyManager.updateAvatar();

    customizer.scrollIntoView({
      behavior: "smooth"
    });

  }

  static updateAvatar() {

    const skinColor =
      document.getElementById("skinColor").value;

    const hairColor =
      document.getElementById("hairColor").value;

    const eyeColor =
      document.getElementById("eyeColor").value;

    const faceShape =
      document.getElementById("faceShape").value;

    const beardStyle =
      document.getElementById("beardStyle").value;

    const avatar =
      document.getElementById("husbandAvatar");

    const face =
      avatar.querySelector(".face");

    const neck =
      avatar.querySelector(".neck");

    const ears =
      avatar.querySelectorAll(".ear");

    const hair =
      avatar.querySelector(".hair");

    const brows =
      avatar.querySelectorAll(".eyebrow");

    const eyes =
      avatar.querySelectorAll(".eye");

    const beard =
      avatar.querySelector(".beard");

    avatar.className =
      `husband-avatar ${faceShape} ${beardStyle}`;

    // PIEL
    face.style.background = skinColor;
    neck.style.background = skinColor;

    ears.forEach(ear => {
      ear.style.background = skinColor;
    });

    // CABELLO
    hair.style.background = hairColor;

    brows.forEach(brow => {
      brow.style.background = hairColor;
    });

    // OJOS
    eyes.forEach(eye => {

      const pupil = eye.querySelector("span");

      if (pupil) {
        pupil.style.background = eyeColor;
      }

    });

    // BARBA
    beard.style.background = hairColor;
    beard.style.borderColor = hairColor;

  }

  static showMessage(tipo) {

    const mensajes = {

      esposo: `
        <h3>Un mensaje de tu esposo </h3>

        <p>
          Amor, hoy quiero recordarte lo valiosa que eres.
          Gracias por llenar nuestro hogar de ternura, paciencia y alegría.
          Eres una mujer maravillosa y una madre increíble.
          Hoy mereces sentirte amada, admirada y especial,
          porque para nosotros eres un regalo de Dios 
        </p>
      `,

      hijos: `
        <h3>Un mensaje de tus hijos </h3>

        <p>
          Mamá, gracias por cada abrazo,
          cada consejo y cada sacrificio.
          Eres nuestro refugio,
          nuestra fuerza y nuestro mayor ejemplo.
          Hoy queremos que sonrías
          y recuerdes cuánto te amamos 
        </p>
      `,

      hermanos: `
        <h3>Un mensaje de tus hermanos </h3>

        <p>
          Hoy celebramos la maravillosa madre
          en la que te convertiste.
          Siempre has sido una persona
          llena de cariño, nobleza y amor.
          Deseamos que este día
          esté lleno de felicidad para ti 
        </p>
      `
    };

    const box =
      document.getElementById("familyMessage");

    box.innerHTML = mensajes[tipo];

    box.classList.remove("hidden");

    // SONIDO
    const audio = new Audio("audio/musica2.mp3");

    audio.volume = 0.4;

    audio.play().catch(() => {});

    // VOZ
    const texto = box.innerText;

    const voz =
      new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";
    voz.rate = 0.9;
    voz.pitch = 1.1;

    speechSynthesis.cancel();

    try {
      speechSynthesis.speak(voz);
    } catch(e) {}

    box.scrollIntoView({
      behavior: "smooth"
    });

  }

}

document.addEventListener("DOMContentLoaded", () => {

  const controls = [
    "skinColor",
    "hairColor",
    "eyeColor",
    "faceShape",
    "beardStyle"
  ];

  controls.forEach(id => {

    const element =
      document.getElementById(id);

    if (element) {

      element.addEventListener("change", () => {

        FamilyManager.updateAvatar();

      });

    }

  });

});

function generateMessage() {
  MessageManager.generateMessage();
}

function generateGiftCard() {
  GiftManager.generateGiftCard();
}