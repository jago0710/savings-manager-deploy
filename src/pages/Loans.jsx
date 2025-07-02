import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Dropdown } from "primereact/dropdown";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/database.jsx";
import useUser from "../hook/useUser.jsx";
import 'primeicons/primeicons.css';
import Header from "../components/Header.jsx";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
        
        
        

export default function Loans() {

    const currentUser = useUser();

    const [loans, setLoans] = useState([]);
    const [accountsData, setAccountsData] = useState([])
    const [accounts,  setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedLoans, setSelectedLoans] = useState(null);

        useEffect(() => {
             const fetchLoans = async () => {
                if (!currentUser?.email) return;
                try{
                    
                    const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser.email), where("number", "==", selectedAccount))
                    const querySnapshot = await getDocs(q);
                    const loansData = querySnapshot.docs.map(doc => doc.data());

                    //const prevLoans = loansData.loans.map(element => ({
                    //    name: element.nombre, value: element.cantidad
                    //}))

                    setLoans(loansData)

                    console.log(loansData);
                    

                } catch (e){
                    console.error("Error al hacer feching de los prestamos", e)
                }
            }

            if (selectedAccount != null) {
                fetchLoans();
            }
        }, [selectedAccount])

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

          const amountRow = (rowData) => {
            return (
                <p>{Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(rowData.amount))}</p>
            )
          }

          const statusRow = (rowData) => {
            return(
                <Tag pt={{root : {className : 'flex flex-row-reverse gap-1'}}} severity={getSeverity(rowData.status)} value={rowData.status} icon={getIconStatus(rowData.status)}></Tag>
            )
          }

          const userRow = (rowData) => {
            return(
                <span className="flex flex-row gap-1">
                    <img className="h-5 w-5 rounded-full" src={rowData.userPhoto} alt="Perfil del usuario" />
                    <p className="truncate">{rowData.user}</p>
                </span>
            )
          }

          const getIconStatus = (status) => {
            switch (status) {
                case 'pendiente':
                    return 'pi pi-exclamation-triangle'
                case 'pagado':
                    return 'pi pi-check-circle'
                default:
                    return 'pi pi-exclamation-circle'
            }
          }

          const getSeverity = (status) => {
            switch (status) {
                case 'pendiente':
                    return 'warning'
                case 'pagado':
                    return 'success'
                default:
                    return 'info'
            }
          }

          const mostrarLog = () => {
            console.log(selectedLoans);
            
          }

          const getButtonsOfAction = () => {
            return(
                <Button label="Pagar" icon="pi pi-dollar" severity="success" disabled={!selectedLoans || !selectedLoans.length} onClick={mostrarLog} ></Button>
            )
          }

          const getTotal = () => {
            let total = 0;
            if (selectedLoans) {
                selectedLoans.forEach(item => {
                total =  parseFloat(total) + parseFloat(item.amount)
            });
            }
            return(
                <p className="font-bold md:text-3xl">Cantidad a pagar: {Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(total))}</p>
            )
          }
          
          const sum = (a, b) => {
            return a + b
          }
    return(
        <>
            <div className="sm:grid md:flex">
                <Navbar page="PRESTAMOS"></Navbar>
                <div className="mt-15 md:ml-67 bg-gray-50 md:mt-0 w-full h-screen">
                    {/**Aqui de pondrá un header mobile */}
                    <Header dropdownData={accounts} dropdown title="PRESTAMOS" dropValue={selectedAccount} change={setSelectedAccount}></Header>
                    {/**<div className="flex gap-5">
                        <button className="border" onClick={mostrar}>mostrar loans</button>
                        <button className="border" onClick={mostrar2}>number</button>
                    </div>*/}
                    <div className="md:hidden mt-[73px] mx-2">
                        <Dropdown  loading={accounts.length <= 0 ? true : false} filter 
                        value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} options={accounts} optionLabel="label" 
                        placeholder="Selecciona una cuenta" className="w-full md:w-14rem" />
                    </div>
                    
                    <div hidden={loans[0]?.loans?.length > 0 && selectedAccount ? false : true} className="m-2 md:mt-2 bg-white border h-full border-gray-200 rounded-md p-5 flex flex-col gap-3 text-xl md:text-3xl text-gray-500">
                            <Toolbar left={getTotal} right={getButtonsOfAction}></Toolbar>
                            <DataTable className="w-full" removableSort stripedRows selection={selectedLoans} onSelectionChange={(e) => setSelectedLoans(e.value)}
                            sortField="date" sortOrder={-1} value={loans[0]?.loans}>
                                <Column selectionMode="multiple" exportable={true}></Column>
                                <Column field="user" header="Usuario" body={userRow} sortable></Column>
                                <Column field="date" header="Fecha" sortable></Column>
                                <Column field="amount" header="Monto" body={amountRow} sortable></Column>
                                <Column field="status" header="Estado" body={statusRow} sortable></Column>
                            </DataTable>
                        
                    </div>

                    {/**Este bloque se renderizará cuando se haga uan consulta a bbdd y no se encuentren resultados*/}
                    <div hidden={loans[0]?.loans?.length <= 0 ? false : true} className="m-2 md:mt-2 bg-white border h-full border-gray-200 rounded-md p-5 flex gap-3 justify-center items-center text-xl md:text-3xl text-gray-500">
                        <h1 className="text-center">No tienes prestamos aqui <span className="pi pi-sparkles" style={screen.width > 500 ? {fontSize: '1.5rem'} : {fontSize: '1rem'}}></span></h1>
                    </div>

                    <div hidden={!selectedAccount ? false : true} className="m-2 md:mt-2 bg-white border h-full border-gray-200 rounded-md p-5 flex gap-3 justify-center items-center text-xl md:text-3xl text-gray-500">
                        <h1>Selecciona una cuenta <span className="pi pi-search" style={screen.width > 500 ? {fontSize: '1.5rem'} : {fontSize: '1rem'}}></span></h1>
                    </div>
                </div>
            </div>
        </>
    )
}