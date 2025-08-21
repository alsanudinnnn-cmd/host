import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDvbW58x-VMHLUUHisGfkaK-7jYntj86vw",
  authDomain: "contactform-a71a3.firebaseapp.com",
  databaseURL: "https://contactform-a71a3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "contactform-a71a3",
  storageBucket: "contactform-a71a3.appspot.com",
  messagingSenderId: "192117293191",
  appId: "1:192117293191:web:dd82adad3366868c7d3822",
  measurementId: "G-44E066NFQN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Form submit listener
document.getElementById("contactForm").addEventListener("submit", submitForm);

async function submitForm(e) {
  e.preventDefault();

  const name = getElementVal("name");
  const emailid = getElementVal("emailid");
  const msgContent = getElementVal("msgContent");

  await saveMessages(name, emailid, msgContent);

  // Show alert
  document.querySelector(".alert").style.display = "block";

  // Hide alert after 3 sec
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Reset form
  document.getElementById("contactForm").reset();
}

async function saveMessages(name, emailid, msgContent) {
  const counterRef = ref(db, "contactFormCounter");

  // Get current counter
  const snapshot = await get(counterRef);
  let newId = 1;

  if (snapshot.exists()) {
    newId = snapshot.val() + 1;
  }

  // Save the new message under contactForm/{newId}
  await set(ref(db, "contactForm/" + newId), {
    id: newId,
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });

  // Update counter
  await set(counterRef, newId);
}

function getElementVal(id) {
  return document.getElementById(id).value;
}
