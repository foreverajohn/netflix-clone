import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC2bxKYM0VJgV29dBSMIxZ7XD3AGMYLqM8",
  authDomain: "netflix-a2ac2.firebaseapp.com",
  projectId: "netflix-a2ac2",
  storageBucket: "netflix-a2ac2.appspot.com",
  messagingSenderId: "238660685444",
  appId: "1:238660685444:web:3a951dcb512b0c953ffcd1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db