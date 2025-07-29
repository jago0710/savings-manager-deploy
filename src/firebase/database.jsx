import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, where, query, getDocs} from "firebase/firestore";

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
