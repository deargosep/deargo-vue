importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js')

var firebaseConfig = {
  apiKey: "AIzaSyAUqIkkhNLja9rPIo1VxJHzfS8GOAqytmg",
  authDomain: "tasks-app12.firebaseapp.com",
  projectId: "tasks-app12",
  storageBucket: "tasks-app12.appspot.com",
  messagingSenderId: "787125914742",
  appId: "1:787125914742:web:783db342ee1c9266a86357",
  measurementId: "G-8LZMB792WZ"
};

const app = firebase.initializeApp(firebaseConfig)