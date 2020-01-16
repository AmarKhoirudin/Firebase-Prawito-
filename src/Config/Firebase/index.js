import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyACujPQBUNQnk7NUNo8uP55qd6ONRxMzVE",
  authDomain: "prawitoturorial.firebaseapp.com",
  databaseURL: "https://prawitoturorial.firebaseio.com",
  projectId: "prawitoturorial",
  storageBucket: "prawitoturorial.appspot.com",
  messagingSenderId: "582366155332",
  appId: "1:582366155332:web:88d301f6bb5a63b7e46211",
  measurementId: "G-KY585K0CMH"
};
// Initialize Firebase  
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
export const database = firebase.database()

export default firebase;
