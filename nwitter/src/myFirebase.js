import * as firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBr43TUKFL8rZnmgaE8UcX2EQ-O7QWPIVE",
  authDomain: "nwitter-ee2a2.firebaseapp.com",
  databaseURL: "https://nwitter-ee2a2.firebaseio.com",
  projectId: "nwitter-ee2a2",
  storageBucket: "nwitter-ee2a2.appspot.com",
  messagingSenderId: "194553886578",
  appId: "1:194553886578:web:94e0a5362ecaebc9ca0feb"
};

// export default firebase.initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
export const firebaseInstatnce = firebase;
export const authService = firebase.auth();
