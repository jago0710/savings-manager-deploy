import { useState, useEffect } from "react";
import CardBank from "../components/CardBank";
import CardNew from "../components/CardNew";
import Navbar from "../components/Navbar";
import useUser from "../hook/useUser";
import { LucideX } from "lucide-react";
import { createAccount, ExistAccountInDataBase } from "../firebase/database";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/database";
import { Chips } from "primereact/chips";
import { ProgressSpinner } from "primereact/progressspinner";
import { ColorPicker } from "primereact/colorpicker";
import { InputText } from 'primereact/inputtext';




export default function Accounts(){
    const currentUser = useUser();

    const [showForm, setShowForm ] = useState(false);
    const [numberAccount, setNumberAccount] = useState(Math.floor(Math.random() * 10000000000000000));
    const [cards, setCards] = useState([]);
    const [owners, setOwners] = useState([]);
    const [colorRGB, setColorRGB] = useState({ r: 100, g: 102, b: 241 });
    const [colorCard, setColorCard] = useState();
    const [descriptionCard, setDescriptionCard] = useState();
    

    useEffect(() => {
        setColorCard(`${colorRGB.r},${colorRGB.g},${colorRGB.b}`)
        const fetchCards = async () => {
            if (!currentUser?.email) return;

            try{
            const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser.email));
            const querySnapshot = await getDocs(q);
            const cardsData = querySnapshot.docs.map(doc => doc.data());
            setCards(cardsData);
            } catch (e){
                console.error("Error fechings accounts", e);
                
            }
            
        }
    
        fetchCards();
        
      }, [currentUser.email, cards]);

    const addAccountInDataBase = async () =>{
        if (await ExistAccountInDataBase(numberAccount)) {
            console.log("Ya existe una cuenta con esta id")
            setShowForm(false)
            setNumberAccount(Math.floor(Math.random() * 10000000000000000))
            console.log(owners);
            
        } else {   
            let updatedOwners  
            if (currentUser.email) {
                updatedOwners = [...owners, currentUser.email]
                setOwners(updatedOwners)
                console.log(owners);
            } else {
                console.log(currentUser.email);
                console.log("No hay email actual del usuario")
            }

            if (owners){
                const newAccount = {}
                newAccount.number = numberAccount
                newAccount.description = descriptionCard
                newAccount.createAccount = new Date().toLocaleDateString()
                newAccount.owners = updatedOwners
                newAccount.color = colorCard
                newAccount.movements = [{
                user: currentUser.displayName,
                date: new Date().toLocaleDateString(),
                description: "Apertura",
                amount: 0,
                total: 0,
            }]

                createAccount(newAccount)
                console.log("Creado con éxito", numberAccount)
                setShowForm(false)
                setNumberAccount(Math.floor(Math.random() * 10000000000000000))
                setCards([])
                setOwners([])
            }

            setOwners([])
        }
    }

    const changeColorCard = (e) =>{
        setColorRGB(e.value)
        setColorCard(`${colorRGB.r},${colorRGB.g},${colorRGB.b}`)
    }

    return(
        <>
            <section className="sm:grid md:flex">
                <Navbar page="CUENTAS DE AHORRO" />
                <div className="w-full mt-12 md:mt-0">
                    <div className="w-full py-5 px-7 text-xl md:border-b md:border-b-gray-200">
                        <h1 className="hidden md:block font-bold font-sans">CUENTAS DE AHORRO </h1>
                    </div>
                    <div className="flex flex-wrap gap-7 md:p-5">
                        <div className="flex flex-wrap gap-4">
                              {cards ? cards.map((card, index) => (
                                <CardBank key={index} number={card.number} description={card.description} createDate={card.createAccount} color={card.color}/>
                              )) : <ProgressSpinner />}
                        <CardNew click={setShowForm} value={!showForm}/>
                        </div>
                        {/** Panel para crear una nueva tarjeta */}
                        <div className={showForm ? "animate-slide-in-right flex flex-col gap-5 top-0 z-2 right-0 border fixed w-full sm:w-95 h-full bg-white border-gray-300 shadow-lg  rounded-l-xl" : "hidden"}>
                            <div className="flex justify-between items-center border-b border-gray-300 p-5">
                                <h2 className="text-nowrap text-xl">Crear nueva tarjeta</h2>
                                <button className="duration-500 hover:rotate-90"  onClick={() => setShowForm(!showForm)}>
                                    <LucideX />
                                </button>
                            </div>
                            <CardBank title="Nueva tarjeta" color={colorCard} redirect={false} number={numberAccount} description={descriptionCard} createDate={new Date().toLocaleDateString()}/>
                            <div className="px-5 flex flex-col gap-4">
                                <div className="flex border border-gray-300 h-15 justify-between items-center px-5 rounded-md">
                                    <p className="text-gray-600">Cambia el color de la tarjeta:</p>
                                    <ColorPicker pt={{input : {className : 'right-0'}}} format="rgb" value={colorRGB} onChange={changeColorCard} />
                                </div>
                                <InputText placeholder="Descripción" pt={{root: {className : 'w-full'}}} type="text" value={descriptionCard} onChange={(e) => setDescriptionCard(e.target.value)} />
                                <Chips 
                                pt={{
                                    token : {className : 'flex justify-between items-center rounded-md bg-gray-100 py-2'},
                                    removeTokenIcon : {color : 'red', class : 'h-5 w-5'},
                                    input : {className : 'border border-gray-300 h-13 pl-3 w-full rounded', type : 'email'}, 
                                    label : {className : 'w-full truncate'}, 
                                    container : {className : 'flex flex-col-reverse gap-3'}}} allowDuplicate="false" id="miembros" separator="," unstyled="true" placeholder="ej: email@gmail.com" value={owners} onChange={(e) => setOwners(e.value)} />
                            <div className="flex flex-col gap-3">
                                <button onClick={() => console.log(owners)}>click</button>
                                <button type="button" onClick={addAccountInDataBase} className="bg-black hover:bg-neutral-800 text-white py-4 px-8 rounded-xl">Crear nueva tarjeta</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}