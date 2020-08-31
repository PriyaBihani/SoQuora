import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

  // Your web app's Firebase configuration
  export const fbConfig = {
    apiKey: "AIzaSyCKlAJzBpkA25G3_buQs_ZCGe4IZ6fiLJY",
    authDomain: "soquora-1129f.firebaseapp.com",
    databaseURL: "https://soquora-1129f.firebaseio.com",
    projectId: "soquora-1129f",
    storageBucket: "soquora-1129f.appspot.com",
    messagingSenderId: "85758344192",
    appId: "1:85758344192:web:481d6b0c0da9ef921c6ce5",
    measurementId: "G-NH9HYQL2BX"
  };
  // Initialize Firebase
  firebase.initializeApp(fbConfig);
  firebase.firestore()
  firebase.functions()

  export default firebase