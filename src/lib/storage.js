import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: "AIzaSyD8sWfr7pF2ASJDTOU5UEJ3Z0mVHaYvP4I",
  appId: "1:892995264915:web:007c3b611ddcd7ba968866",
  authDomain: "mi-club2ruedas.firebaseapp.com",
  databaseURL: "https://mi-club2ruedas.firebaseio.com",
  messagingSenderId: "892995264915",
  projectId: "mi-club2ruedas",
  storageBucket: "mi-club2ruedas.appspot.com",
}

// if (!firebase.apps.length && firebaseConfig.projectId != null) {
//   firebase.initializeApp(firebaseConfig)
// }

/*const messaging = firebase.messaging()
messaging
  .requestPermission()
  .then(function () {
    console.log('tienes permisos')
  })
  .catch(function () {
    console.log('Ocurrio error')
  })*/

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }
