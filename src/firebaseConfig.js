import firebase from "firebase/app";
import "firebase/firestore";

// firebase init

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWGmx-WuPNpEKh1GiuyapbZ2aSF-AsZkk",
  authDomain: "infosalud-4795a.firebaseapp.com",
  databaseURL: "https://infosalud-4795a.firebaseio.com",
  projectId: "infosalud-4795a",
  storageBucket: "infosalud-4795a.appspot.com",
  messagingSenderId: "106181316869",
  appId: "1:106181316869:web:6d20d2bcd7d4434614276c",
  measurementId: "G-PR8P0HPPVX"
};

firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();

// firebase collectionsa
const hospitalCollection = db.collection("hospital");
const citasCollection = db.collection("citas");
//const orderCollection = db.collection("buyout_order");
export { firebase, db, hospitalCollection, citasCollection };
