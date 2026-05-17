import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  get,
  set
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIZaSyDIGWQWrKuf8ny800zu_6_IBIIpF5K2068",
  authDomain: "dia-de-las-madres-d9de4.firebaseapp.com",
  databaseURL: "https://dia-de-las-madres-d9de4-default-rtdb.firebaseio.com",
  projectId: "dia-de-las-madres-d9de4",
  storageBucket: "dia-de-las-madres-d9de4.appspot.com",
  messagingSenderId: "541609721879",
  appId: "1:541609721879:web:9cdf03b9521f9aa6bfdc52"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

window.db = db;
window.firebaseDB = {
  ref,
  push,
  onValue,
  get,
  set
};

console.log("Firebase conectado correctamente");