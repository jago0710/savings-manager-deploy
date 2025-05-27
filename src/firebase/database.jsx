import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, where, query, getDocs} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA6C1M3iaDxIzwtdGK9mjDlL2G0FacGfC8",
    authDomain: "savingsmanager-64a27.firebaseapp.com",
    projectId: "savingsmanager-64a27",
    storageBucket: "savingsmanager-64a27.firebasestorage.app", // <--- Pasar a Enviroments
    messagingSenderId: "897149478707",
    appId: "1:897149478707:web:89420aa72712783b7d4046",
    measurementId: "G-GR5PYF0VJE"
}
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//Create user in database
export const createUser = (user) => {
    addDoc(collection(db, "USERS"), user)
    .then(result => console.log("result: ", result))
    .catch(error => console.log("Error: ",error))
}


//Verify if user exist in the database
export const ExistUserInDataBase = async (email) => {
   try{
    const q = query(collection(db, "USERS"), where("email", "==", email))
   const docs = await getDocs(q)
   console.log("QUERY: ",docs, "Empty:", docs.empty)
   return !docs.empty;
   }catch(e){
    console.log("Error en la query: ", e);
    return false;
   }
}

//create account in database
export const createAccount = (account) => {
    addDoc(collection(db, "ACCOUNTS"), account)
    .then(result => console.log("result: ", result))
    .catch(error => console.log("Error: ",error))
}

export const ExistAccountInDataBase = async (id) => {
    try{
    const q = query(collection(db, "ACCOUNTS"), where("id", "==", id))
    const docs = await getDocs(q)
    console.log("QUERY: ",docs, "Empty:", docs.empty)
    return !docs.empty;
    }catch(e){
     console.log("Error en la query: ", e);
     return false;
    }
 }
