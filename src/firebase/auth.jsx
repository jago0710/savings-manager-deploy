import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { createUser, ExistUserInDataBase } from "./database";

const provider = new GoogleAuthProvider();
const firebaseConfig = {
    apiKey: "AIzaSyA6C1M3iaDxIzwtdGK9mjDlL2G0FacGfC8",
    authDomain: "savingsmanager-64a27.firebaseapp.com",
    projectId: "savingsmanager-64a27",
    storageBucket: "savingsmanager-64a27.firebasestorage.app",
    messagingSenderId: "897149478707",
    appId: "1:897149478707:web:89420aa72712783b7d4046",
    measurementId: "G-GR5PYF0VJE"
}
const app = initializeApp(firebaseConfig);

export function LoginGoogle(){

   //Function for add user, for create user
   const addUserInDataBase = (user) => {
      
      const newUser = {}
      newUser.uid = user.uid
      newUser.email = user.email
      newUser.name = user.displayName
      newUser.photoURL = user.photoURL
      newUser.dateCreation = new Date().toLocaleDateString()
      newUser.accounts = []

      createUser(newUser);
   }


 const auth = getAuth()

 signInWithPopup(auth, provider)
 .then(async(result) => {
    const exists = await ExistUserInDataBase(result.user.email);
    if(exists){
      console.log("Ya existe este usuario");
    } else {
      addUserInDataBase(result.user);
    }
   })
   .catch((error) => {
      console.log(error);
      
   })
   }

export const onChangeUser = (setUser) => {

   const auth = getAuth();
   onAuthStateChanged(auth, (user) => {
      const usuario = user ? user : null 
      setUser(usuario)
   })
}

export const onSignOut = () => {
   const  auth = getAuth();
   auth.signOut()
   .then(() => {
      window.location.href = "/"
      console.log("Sign-out successful.")
   })
}