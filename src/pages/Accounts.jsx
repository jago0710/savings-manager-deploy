import { useState, useEffect, useRef } from "react";
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
import { Toast } from "primereact/toast";




export default function Accounts(){
    const currentUser = useUser();

    const toast = useRef(null);
    const [showForm, setShowForm ] = useState(false);
    const [numberAccount, setNumberAccount] = useState(Math.floor(Math.random() * 10000000000000000));
    const [cards, setCards] = useState();
    const [owners, setOwners] = useState([]);
    const [colorRGB, setColorRGB] = useState({ r: 145, g: 110, b: 0 });
    const [colorCard, setColorCard] = useState();
    const [descriptionCard, setDescriptionCard] = useState(null);
    

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
            console.log(currentUser.email);
            
            let updatedOwners
            if (currentUser.email && !owners.includes(currentUser.email)) {
                updatedOwners = [...owners, currentUser.email]
                setOwners(updatedOwners);
            }

            if (owners.length > 0){
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
            } else {
                const newAccount = {}
                newAccount.number = numberAccount
                newAccount.description = descriptionCard
                newAccount.createAccount = new Date().toLocaleDateString()
                newAccount.owners = [currentUser.email]
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

    const show = (value) => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: `Ya se añadió a ${value}`})
    }

    const addMember = (e) =>{
        console.log(owners.length);
        
        if (e.value.length > owners.length) {
            if (owners.length === 0) {
            setOwners(e.value)
        } else {
            if (owners.includes(e.value[e.value.length - 1])){
                show(e.value[e.value.length - 1]);
            } else {
                console.log(e.value);
                
                setOwners(e.value)
            }
        }
        } else {
            setOwners(e.value)
        }
    }

    return(
        <>
            <section className="sm:grid md:flex">
                <Navbar page="CUENTAS DE AHORRO" />
                <div className="w-full mt-12 md:mt-0 md:ml-67 bg-gray-50">
                    <div className="w-full py-5 px-7 text-xl md:border-b bg-white md:border-b-gray-200">
                        <h1 className="hidden md:block font-bold font-sans">CUENTAS DE AHORRO </h1>
                    </div>
                    <div className={cards ? "flex flex-wrap gap-7 pb-5 sm:px-5 md:p-5 md:justify-start justify-center" : "flex justify-center items-center h-screen"}>
                        <div className={cards ? "flex flex-wrap gap-5 justify-center items-center sm:justify-start sm:items-start" : "flex justify-center items-center h-screen"}>
                              {cards ? cards.map((card, index) => (
                                <CardBank key={index} number={card.number} description={card.description} createDate={card.createAccount} color={card.color}/>
                              )) : <ProgressSpinner />}
                        <div hidden={cards ? false : true}>
                            <CardNew click={setShowForm} value={!showForm}/>
                        </div>
                        </div>
                        {/** Panel para crear una nueva tarjeta */}
                        <div className={showForm ? "animate-slide-in-right flex flex-col top-0 z-2 right-0 border fixed w-full sm:w-95 h-full bg-white border-gray-300 shadow-lg  rounded-l-xl" : "hidden"}>
                            <div className="flex justify-between items-center border-b border-gray-300 p-5">
                                <h2 className="text-nowrap text-xl">Crear nueva tarjeta</h2>
                                <button className="duration-500 hover:rotate-90"  onClick={() => setShowForm(!showForm)}>
                                    <LucideX />
                                </button>
                            </div>
                            <div className="px-5 flex flex-col gap-4 overflow-y-scroll h-full my-5">
                            <CardBank title="Nueva tarjeta" color={colorCard} redirect={false} number={numberAccount} description={descriptionCard} createDate={new Date().toLocaleDateString()}/>
                                <div className="flex border border-gray-300 min-h-14 justify-between items-center px-5 rounded-md">
                                    <p className="text-gray-600">Cambia el color de la tarjeta:</p>
                                    <ColorPicker pt={{input : {className : 'right-0'}}} format="rgb" value={colorRGB} onChange={changeColorCard} />
                                </div>
                                <InputText placeholder="Descripción" pt={{root: {className : 'w-full'}}} type="text" value={descriptionCard} onChange={(e) => setDescriptionCard(e.target.value)} />
                                <Toast ref={toast}></Toast>
                                <Chips 
                                pt={{
                                    token : {className : 'flex justify-between items-center rounded-md bg-gray-100 py-2 px-5'},
                                    removeTokenIcon : {color : 'red'},
                                    input : {className : 'border border-gray-300 h-13 pl-3 w-full rounded', type : 'email'}, 
                                    label : {className : 'w-full truncate'}, 
                                    container : {className : 'flex flex-col-reverse gap-3'}}} allowDuplicate="false" id="miembros" separator="," unstyled="true" placeholder="ej: email@gmail.com" value={owners} onChange={addMember} />
                            <div className="flex flex-col gap-3">
                                {/*<button onClick={() => console.log(owners)}>click</button>*/}
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