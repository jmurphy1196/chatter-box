import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCn7E2CzB6mQ2d-bsm7TJoOP7HiILCWbWI",
  authDomain: "chatter-box-bcc66.firebaseapp.com",
  databaseURL: "https://chatter-box-bcc66.firebaseio.com",
};

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
