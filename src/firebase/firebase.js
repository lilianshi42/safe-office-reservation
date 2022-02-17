import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBYxMM9lL5dPYnbgYfbDq031WumRVxyrdA",
    authDomain: "safe-office-reservation.firebaseapp.com",
    projectId: "safe-office-reservation",
    storageBucket: "safe-office-reservation.appspot.com",
    messagingSenderId: "22641667249",
    appId: "1:22641667249:web:8ff426031abcf505764690"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const firebase = firebase.firestore();

  const 
