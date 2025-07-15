import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Chart } from 'primereact/chart';
import { Knob } from 'primereact/knob';
import { Dropdown } from 'primereact/dropdown';
import useUser from "../hook/useUser";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/database";
import Header from "../components/Header";
import TableDashboard from "../components/TableDashboard";
import { Toast } from "primereact/toast";

export default function Dashboard() {
    const currentUser = useUser();

    const [accountDataSelected, setAccountsDataSelected] = useState();//Aqui estará el objeto con los datos de la cuenta
    const [accounts,  setAccounts] = useState([]); // Este es el useState para el Dropdown, no queda muy bien nombrado porque confunde
    const [selectedAccount, setSelectedAccount] = useState(null); // Aqui se guarda el número de la cuenta seleccionada para descpués hacer fetching a ella
    const [ingresos, setIngresos] = useState();
    const [retiros, setRetiros] = useState();
    const [prestamos, setPrestamos] = useState();
    const [beneficios, setBeneficios] = useState();
    const [total, setTotal] = useState();
    const [objetivo, setObjetivo] = useState();
                
        //Este useEffect es para ordenar el Dropdown para seleccionar
        useEffect(() => { 
            if (!currentUser?.email) return;
                
                const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser?.email));
                const unsubscripte = onSnapshot(q, (querySnapshot) => {
                    const accountsData = querySnapshot.docs.map(doc => doc.data());
                
                    
                    const formattedAccounts = accountsData.map(element => ({
                        label: element.description  + " - " + element.number,
                        value: element.number
                    }));
                    
                    setAccounts(formattedAccounts);
                    
                }, (error) => {
                    console.error("Error en la subcripción:", error);
                });

            return () => {
                unsubscripte();
            }
                
        }, [currentUser?.email]);


        useEffect(() => {
             const fetchAccount = async () => {
                if (!currentUser?.email) return;

                try{
                    const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser.email), where("number", "==", selectedAccount))
                    const querySnapshot = await getDocs(q);
                    const accountSelected = querySnapshot.docs.map(doc => doc.data());
                    
                    setAccountsDataSelected(accountSelected[0])

                    getIngresosTotales(accountSelected[0]);
                    getRetirosTotales(accountSelected[0]);
                    getPrestamosTotales(accountSelected[0]);
                    getBeneficiosTotales(accountSelected[0]);
                    setTotal(accountSelected[0].total)
                    setObjetivo(accountSelected[0].target)
                } catch (e){
                    console.error("Error al hacer feching de los prestamos", e)
                }
            }

            if (selectedAccount != null) {
                fetchAccount();
            }
        }, [currentUser?.email, selectedAccount])


 const getIngresosTotales = (accountSelected) => {
    const movementsIngresos = accountSelected.movements.filter((movement) => movement.description == "Ingresar")
    let total = 0;
    movementsIngresos.forEach(movement => {
        total = parseFloat(total) + parseFloat(movement?.amount);
    });

    setIngresos(total)
 }

 const getRetirosTotales = (accountSelected) => {
    const movementsIngresos = accountSelected.movements.filter((movement) => movement.description == "Retirar" || movement.description == "Prestamo")
    let total = 0;
    movementsIngresos.forEach(movement => {
        total = parseFloat(total) + parseFloat(movement?.amount);
    });

    setRetiros(total)
 }
 
 const getPrestamosTotales = (accountSelected) => {
    const movementsIngresos = accountSelected.movements.filter((movement) => movement.description == "Prestamo")
    let total = 0;
    movementsIngresos.forEach(movement => {
        total = parseFloat(total) + parseFloat(movement?.amount);
    });

    setPrestamos(total)
 }

 const getBeneficiosTotales = (accountSelected) => {
    const movementsIngresos = accountSelected.movements.filter((movement) => movement.description == "Retirar")
    let total = 0;
    movementsIngresos.forEach(movement => {
        total = parseFloat(total) + parseFloat(movement?.amount);
    });

    setBeneficios(total)
 }
  return (
    <>
      <div className="sm:grid md:flex">
        <Navbar page="DASHBOARD" />
          <div className="mt-0 md:ml-67 bg-gray-50 w-full h-screen">
            <Header title="DASHBOARD" dropdown dropdownData={accounts} dropValue={selectedAccount} change={setSelectedAccount}></Header>
            <div className="md:hidden mt-[73px] mx-2">
                <Dropdown loading={accounts.length <= 0 ? true : false} filter value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} 
                options={accounts} optionLabel="label" placeholder="Selecciona una cuenta" className="w-full md:w-14rem" />
            </div>
            
            <TableDashboard hidden={!selectedAccount} totalCurrent={total} totalTarget={objetivo} TotalIncome={ingresos} totalRatreats={retiros} totalLoans={prestamos} totalBenefits={beneficios} ></TableDashboard>

                {/** Abajo cuando este en mantenimiento */}
                <div hidden={!selectedAccount ? false : true} className="m-2 md:mt-2 mt-2 bg-white h-[calc(100%-141px)] md:h-[calc(100vh-89px)] border border-gray-200 rounded-md p-5 flex gap-3 justify-center items-center text-xl md:text-3xl text-gray-500">
                    <h1 hidden={selectedAccount ? true : false}>Selecciona una cuenta <span className="pi pi-search" style={screen.width > 500 ? {fontSize: '1.5rem'} : {fontSize: '1rem'}}></span></h1>
                </div>
          </div>
      </div>
    </>
  );
}
