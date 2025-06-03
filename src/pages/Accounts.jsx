import { useState, useEffect } from "react";
import CardBank from "../components/CardBank";
import CardNew from "../components/CardNew";
import Navbar from "../components/Navbar";
import useUser from "../hook/useUser";
import { LucideX } from "lucide-react";
import { createAccount, ExistAccountInDataBase } from "../firebase/database";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/database";
import { Button } from 'primereact/button';
import { Chips } from "primereact/chips";
import { FloatLabel } from 'primereact/floatlabel';



export default function Accounts(){
    const currentUser = useUser();

    const [showForm, setShowForm ] = useState(false);
    const [numberAccount, setNumberAccount] = useState(Math.floor(Math.random() * 10000000000000000));
    const [cards, setCards] = useState([]);
    const [owners, setOwners] = useState([]);

    

    useEffect(() => {
        const fetchCards = async () => {
          const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser.email));
          const querySnapshot = await getDocs(q);
          const cardsData = querySnapshot.docs.map(doc => doc.data());
          setCards(cardsData);
        };
    
        fetchCards();
      }, [currentUser.email, cards]);

    const addAccountInDataBase = async () =>{
        if (await ExistAccountInDataBase(numberAccount)) {
            console.log("Ya existe una cuenta con esta id")
            setShowForm(false)
            setNumberAccount(Math.floor(Math.random() * 10000000000000000))
        } else {     
            setOwners(...owners, currentUser.email)    
            const newAccount = {}
            newAccount.number = numberAccount
            newAccount.createAccount = new Date().toLocaleDateString()
            newAccount.owners = owners
            newAccount.movements = [{ user: currentUser.displayName,
                "date": new Date().toLocaleDateString(),
                description: "Apertura",
                amount: 0,
                total: 0,
                }]
            createAccount(newAccount)
            console.log("Creado con exito ", numberAccount);
            setShowForm(false)
            setNumberAccount(Math.floor(Math.random() * 10000000000000000))
            setCards([])
        }
    }

    return(
        <>
            <section className="sm:grid md:flex">
                <Navbar />
                <div  className="w-full mx-5">
                    <h1>ACCOUNTS</h1>
                    <div className="flex flex-wrap gap-7 py-5">
                        <div className="flex flex-wrap gap-4">
                              {cards.map((card, index) => (
                                <CardBank key={index} number={card.number} />
                              ))}
                        </div>
                        <CardNew click={setShowForm} value={!showForm}/>
                        <div className={showForm ? "animate-slide-in-left flex flex-col gap-5 top-0 right-0 border absolute w-[230] h-full bg-white border-gray-300 shadow-lg  p-5 rounded-xl" : "hidden"}>
                            <div className="flex justify-between px-2 items-center border-b pb-5">
                                <h2 className="text-nowrap text-xl">Crear nueva tarjeta</h2>
                                <button className="duration-500 hover:rotate-90"  onClick={() => setShowForm(!showForm)}>
                                    <LucideX />
                                </button>
                            </div>
                            <CardBank title="Nueva tarjeta" number={numberAccount} createDate={new Date().toLocaleDateString()}/>
                            <FloatLabel>
                                <Chips id="miembros" className="border" value={owners} onChange={(e) => setOwners(e.value)} />
                                <label htmlFor="miembros">Miembros...</label>
                            </FloatLabel> 
                            <button type="button" onClick={addAccountInDataBase} className="bg-black hover:bg-neutral-800 text-white py-4 px-8 rounded-xl">Crear nueva tarjeta</button>
                            <Button label="Crear nueva cuenta" severity="primary" icon="pi pi-credit-card" text raised />
                            <Button label="Añadir cuenta existente" severity="secondary" icon="pi pi-credit-card" text raised />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}