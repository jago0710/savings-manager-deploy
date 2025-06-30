import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Dropdown } from "primereact/dropdown";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/database.jsx";
import useUser from "../hook/useUser.jsx";
import 'primeicons/primeicons.css';
        

export default function Loans() {

    const currentUser = useUser();

    const [accountsData, setAccountsData] = useState([])
    const [accounts,  setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);

        useEffect(() => {
            const fetchAccounts = async () => {
                if (!currentUser?.email) return;
    
                try{
                const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser.email));
                const querySnapshot = await getDocs(q);
                const accountsData = querySnapshot.docs.map(doc => doc.data());
                setAccountsData(accountsData);

                const formattedAccounts = accountsData.map(element => ({
                    label: element.description  + " - " + element.number,
                    value: element.number
                }));

                setAccounts(formattedAccounts);
                
                } catch (e){
                    console.error("Error fechings accounts", e);
                    
                }
                
            }
            fetchAccounts();
          });

    return(
        <>
            <div className="sm:grid md:flex">
                <Navbar page="PRESTAMOS"></Navbar>
                <div className="mt-15 md:ml-67 bg-gray-50 md:mt-0 w-full h-screen">
                    <div className="hidden md:flex w-full py-5 px-7 text-xl bg-white md:border-b md:border-b-gray-200  flex-row justify-between items-center">
                        <h1 className="font-bold font-sans">PRESTAMOS</h1>
                        <div className="w-md">
                            <Dropdown loading={accounts.length <= 0 ? true : false} filter
                            value={selectedAccount} onChange={(e) => setSelectedAccount(e.value)} options={accounts} optionLabel="label" 
                            placeholder="Selecciona una cuenta" className="w-full md:w-14rem" />
                        </div>
                    </div>
                    <div className="m-2 bg-white h-full border border-gray-200 rounded-md p-5 flex gap-3 justify-center items-center text-xl md:text-3xl text-gray-500">
                        <h1>Selecciona una cuenta <span className="pi pi-search" style={screen.width > 500 ? {fontSize: '1.5rem'} : {fontSize: '1rem'}}></span></h1>
                    </div>
                </div>
            </div>
        </>
    )
}