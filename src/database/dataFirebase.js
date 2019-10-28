import firebase from "firebase";

var config = {
  apiKey: "AIzaSyDT2Ds0BtqcKW5n2BMMYq_x1NUaJMICm4w",
  authDomain: "f3mteste.firebaseapp.com",
  databaseURL: "https://f3mteste.firebaseio.com",
  projectId: "f3mteste",
  storageBucket: "f3mteste.appspot.com",
  messagingSenderId: "304625878691",
  appId: "1:304625878691:web:b9e43acefedea722b66116"
};
const Firebase = firebase.initializeApp(config);

export default Firebase;
