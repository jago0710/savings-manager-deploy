import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { createUser, ExistUserInDataBase } from "./database";

const provider = new GoogleAuthProvider();
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET, // <--- Pasar a Enviroments
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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