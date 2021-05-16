import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'


var firebaseConfig = {
  apiKey: "AIzaSyAUqIkkhNLja9rPIo1VxJHzfS8GOAqytmg",
  authDomain: "tasks-app12.firebaseapp.com",
  projectId: "tasks-app12",
  storageBucket: "tasks-app12.appspot.com",
  messagingSenderId: "787125914742",
  appId: "1:787125914742:web:783db342ee1c9266a86357",
  measurementId: "G-8LZMB792WZ"
};

app.initializeApp(firebaseConfig)

export const firebase = app
export const db = app.firestore()
export const storageRef = app.storage().ref()

export const usersRef = db.collection('users')
export const roomsRef = db.collection('chatRooms')
export const messagesRef = roomId => roomsRef.doc(roomId).collection('messages')

export const filesRef = storageRef.child('files')

export const dbTimestamp = firebase.firestore.FieldValue.serverTimestamp()
export const deleteDbField = firebase.firestore.FieldValue.delete()