import firebase from 'firebase/app';
import  'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';



let firebaseConfig = {
    apiKey: "AIzaSyDf0SkFWhtxkRuW14eHfuc5A_SFevRusiA",
    authDomain: "cursoreact-5ca96.firebaseapp.com",
    projectId: "cursoreact-5ca96",
    storageBucket: "cursoreact-5ca96.appspot.com",
    messagingSenderId: "36984249709",
    appId: "1:36984249709:web:bf650e77f72fc593f2ce64",
    measurementId: "G-7DZ81C3CYS"
  };
  
  // Initialize Firebase
  if(!firebase.apps.length){
    const app = firebase.initializeApp(firebaseConfig);
   
  }

  export default firebase;
  