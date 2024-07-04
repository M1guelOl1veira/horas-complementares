import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBwxbFfw7ZygqCvlOH3_oAMwmlzp2Pb_Cg",
    authDomain: "horas-complementares-fb9db.firebaseapp.com",
    projectId: "horas-complementares-fb9db",
    storageBucket: "horas-complementares-fb9db.appspot.com",
    messagingSenderId: "292023616981",
    appId: "1:292023616981:web:9b10d9a8fa7f7e59c4295c",
    measurementId: "G-V9Q6HE744M"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore()
export default firebase;