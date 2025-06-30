import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Chart } from 'primereact/chart';
import { Knob } from 'primereact/knob';
import { Dropdown } from 'primereact/dropdown';
import useUser from "../hook/useUser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/database";
import Header from "../components/Header";

export default function Dashboard() {
    
    const currentUser = useUser();

    const [porcentajeOb, setporcentajeOb] = useState(80);
    const [accounts,  setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState();

        useEffect(() => {
            const fetchAccounts = async () => {
                if (!currentUser?.email) return;
    
                try{
                const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser.email));
                const querySnapshot = await getDocs(q);
                const accountsData = querySnapshot.docs.map(doc => doc.data());
                setAccounts(accountsData);

                const formattedAccounts = accountsData.map(element => ({
                    label: element.description  + " - " + element.number ,
                    value: element.number
                }));

                setAccounts(formattedAccounts);

                } catch (e){
                    console.error("Error fechings accounts", e);
                    
                }
                
            }
        
            fetchAccounts();
            
          });

  const changeValue = (e) => {
    (e) => setSelectedAccount(e.value)
  }

  return (
    <>
      <div className="sm:grid md:flex">
        <Navbar page="DASHBOARD" />
          <div className="mt-15 md:ml-67 bg-gray-50 md:mt-0 w-full h-screen">
            <Header title="DASHBOARD" dropdown dropdownData={accounts} dropValue={selectedAccount} change={setSelectedAccount}></Header>
            <div className="md:mt-0 mt-[73px] p-2 grid lg:grid-cols-4 grid-cols-2 gap-2" hidden={selectedAccount ? false : true}>
                <div className="h-40 rounded-md border border-gray-200 flex justify-around items-center bg-white col-span-2 md:col-span-4">
                    <div className="w-full text-center flex flex-row gap-5 justify-center-safe items-center">
                        <div>
                            <p className="text-xl sm:text-3xl">185,00€</p>
                            <p>Actual</p>
                        </div>
                        <Knob pt={{root : {className : ''}}} value={porcentajeOb} onChange={(e) => setValue(e.value)} valueTemplate={porcentajeOb + "%"} />
                        <div>
                            <p className="text-xl sm:text-3xl">215,00€</p>
                            <p>Objetivo</p>
                        </div>
                    </div>
                </div>
                <div className="h-40 rounded-md border border-gray-200 flex flex-col-reverse md:flex-row justify-around items-center bg-white">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <span className="pi pi-arrow-up-right" style={{ fontSize: '1.5rem', color : "#0384fc" }}></span>
                        <p className="text-2xl sm:text-3xl">252,35€</p>
                        <p className="text-xl">Ingresos</p>
                    </div>
                </div>
                <div className="h-40 rounded-md border border-gray-200 flex justify-around items-center bg-white">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <span className="pi pi-arrow-down-right" style={{ fontSize: '1.5rem', color : "red"}}></span>
                        <p className="text-2xl sm:text-3xl">125,00€</p>
                        <p className="text-xl">Retiros</p>
                    </div>
                </div>
                <div className="h-40 rounded-md border border-gray-200 flex justify-around items-center bg-white">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <span className="pi pi-building-columns" style={{ fontSize: '1.5rem', color : "#ffa600"}}></span>
                        <p className="text-2xl sm:text-3xl">92,50€</p>
                        <p className="text-xl">Prestamos</p>
                    </div>
                </div>
                <div className="h-40 rounded-md border border-gray-200 flex justify-around items-center bg-white">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <span className="pi pi-chart-line" style={{ fontSize: '1.5rem', color : "#069c0b"}}></span>
                        <p className="text-2xl sm:text-3xl">70.512,98€</p>
                        <p className="text-xl">Benefios</p>
                    </div>
                </div>
            </div>
                {/** Abajo cuando este en mantenimiento */}
                <div hidden={!selectedAccount ? false : true} className="m-2 md:mt-2 mt-[73px] bg-white h-full border border-gray-200 rounded-md p-5 flex gap-3 justify-center items-center text-xl md:text-3xl text-gray-500">
                    <h1 hidden={selectedAccount ? true : false}>Selecciona una cuenta <span className="pi pi-search" style={screen.width > 500 ? {fontSize: '1.5rem'} : {fontSize: '1rem'}}></span></h1>
                </div>
          </div>
      </div>
    </>
  );
}
