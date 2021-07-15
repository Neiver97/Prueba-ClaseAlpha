import firebase from 'firebase'
//import firestore from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDBIqd_lrlqaJGSlrR4OylV3NSLXT0A3e4",
    authDomain: "prueba-clasealpha.firebaseapp.com",
    projectId: "prueba-clasealpha",
    storageBucket: "prueba-clasealpha.appspot.com",
    messagingSenderId: "74495814581",
    appId: "1:74495814581:web:a11690c934f53eb77447fc",
    measurementId: "G-V6BHH7KEH7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore().settings({timestampsInSnapshots:true});

export default firebaseApp.firestore();