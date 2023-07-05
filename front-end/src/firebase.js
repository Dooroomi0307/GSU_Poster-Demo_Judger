import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBQfdj656HAikaRUOl_ELs5TNYSuo2ucw",
  authDomain: "gsu-demo-day.firebaseapp.com",
  databaseURL: "https://gsu-demo-day-default-rtdb.firebaseio.com",
  projectId: "gsu-demo-day",
  storageBucket: "gsu-demo-day.appspot.com",
  messagingSenderId: "717238736966",
  appId: "1:717238736966:web:f457f51860874e75271247",
  measurementId: "G-T82JVFH77P"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;

