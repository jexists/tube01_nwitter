import { environment } from "./environments/env"
import * as firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: environment.FIREBASE_API_KEY,
  authDomain: environment.FIREBASE_AUTH_DOMAIN,
  databaseURL: environment.FIREBASE_DATABASE_URL,
  projectId: environment.PROJECTID,
  storageBucket: environment.STORAGE_BUCKET,
  messagingSenderId: environment.MESSAGINGSENDERID,
  appId: environment.APPID
};

// export default firebase.initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
export const firebaseInstatnce = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();