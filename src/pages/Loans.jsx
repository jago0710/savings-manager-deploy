import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { Dropdown } from "primereact/dropdown";
import { arrayUnion, collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/database.jsx";
import useUser from "../hook/useUser.jsx";
import 'primeicons/primeicons.css';
import Header from "../components/Header.jsx";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import StatusTag from '../components/StatusTag.jsx';
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import ButtonTop from "../components/ButtonTop.jsx";
import { Toast } from "primereact/toast";
import { CalendarDays, Euro } from "lucide-react";
        
        
        

export default function Loans() {

    const currentUser = useUser();
    const toast = useRef(null);

    const [refresh, setRefresh] = useState(false);
    const [loans, setLoans] = useState([]);
    const [accountsData, setAccountsData] = useState([])
    const [accounts,  setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedLoans, setSelectedLoans] = useState(null);
    const [viewAllloans, setViewAllLoans] = useState(false)
    const [payTotal, setPayTotal] = useState(0)

        useEffect(() => {
             const fetchLoans = async () => {
                if (!currentUser?.email) return;
                try{
                    const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser.email), where("number", "==", selectedAccount))
                    const querySnapshot = await getDocs(q);
                    const loansData = querySnapshot.docs.map(doc => doc.data());

                    setLoans(loansData)

                    console.log("Loans Data: ",loansData);
                    console.log("Select Account: ",selectedAccount);
                    console.log("Select Loans: ",selectedLoans);
                    

                } catch (e){
                    console.error("Error al hacer feching de los prestamos", e)
                }
            }

            if (selectedAccount != null) {
                fetchLoans();
            }
        }, [currentUser?.email, refresh ,selectedAccount])

        useEffect(() => {
            
                if (!currentUser?.email) return;
                
                const q = query(collection(db, "ACCOUNTS"), where("owners", "array-contains", currentUser.email));
                const unsubscripte = onSnapshot(q, (querySnapshot) => {
                    const accountsData = querySnapshot.docs.map(doc => doc.data());
                    setAccountsData(accountsData);
                    
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
                   
        }, [currentUser?.email, selectedLoans]);


          const amountRow = (rowData) => {
            return (
                <p>{Intl.NumberFormat("de-DE", {
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
                <span className="flex flex-row gap-2 items-center">
                    <img className="h-7 w-7 rounded-full" src={rowData.userPhoto} alt="Perfil del usuario" />
                    <p className="truncate">{rowData.user}</p>
                </span>
            )
          }

          const getIconStatus = (status) => {
            switch (status) {
                case 'Pendiente':
                    return 'pi pi-exclamation-triangle'
                case 'Pagado':
                    return 'pi pi-check-circle'
                default:
                    return 'pi pi-exclamation-circle'
            }
          }

          const getSeverity = (status) => {
            switch (status) {
                case 'Pendiente':
                    return 'warning'
                case 'Pagado':
                    return 'success'
                default:
                    return 'info'
            }
          }

          const resetValuesForViewAlls = () => {
            setViewAllLoans(!viewAllloans)
          }


          const getButtonsOfAction = () => {
            return(
                <div className="flex gap-2">
                    <Button pt={{label : {className : 'text-sm'}, badge : {class : 'rounded-full text-xs bg-green-200 text-green-600 ml-1 w-4 h-4'}}} label="Pagar" badge={selectedLoans ? selectedLoans.length : false} 
                    severity="success" raised  disabled={!selectedLoans || !selectedLoans.length || viewAllloans} onClick={addloanToFirestore} ></Button>  
                    <Button icon={viewAllloans ? "pi pi-users" : "pi pi-user"} 
                    severity="secondary" raised text ={viewAllloans ? false : true} onClick={resetValuesForViewAlls} ></Button>
                </div>
            )
          }

          const getTotal = () => {
            var total = 0;
            if (selectedLoans) {
                selectedLoans.forEach(item => {
                total =  parseFloat(total) + parseFloat(item.amount)
                setPayTotal(total)
            });
            }
            return(
                <div className="flex items-center gap-2">
                    <p className="font-bold text-xl md:text-3xl">Total:</p>
                    <p className="font-bold text-xl md:text-3xl">{Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(total))}</p>
                </div>
            )
          }

          const allHeader = () => {
            return(
                <span className="pi pi-eye" style={{width: "22px"}}></span>
            )
          }

          var totalMoney = (parseFloat(loans[0]?.total) + parseFloat(payTotal));
          
          const addloanToFirestore = async () => {
            // Crear nuevo movimiento
            const today = new Date();
            const newloan = {
            id: crypto.randomUUID(),
            date: today.toLocaleDateString(),
            description: "Pago",
            amount: payTotal,
            total: totalMoney,
            "user": currentUser?.displayName,
            userPhoto: currentUser?.photoURL
            };

            try {
              //Busco el documento de la cuenta por el número
              const q = query(collection(db, "ACCOUNTS"), where("number", "==", parseInt(selectedAccount)));
              const querySnapshot = await getDocs(q);
          
              if (!querySnapshot.empty) {
                const docRef = doc(db, "ACCOUNTS", querySnapshot.docs[0].id); // obtengo el ID del documento para actualizar el docmento
          
                // Actualizo y agrego el movimiento
                await updateDoc(docRef, {
                  loans: arrayUnion(newloan),
                  total: totalMoney
                })
          
                console.log("Movimiento agregado correctamente.");
                changeStatusOfPayments()
              } else {
                console.error("No se encontró la cuenta.");
              }
            } catch (error) {
              console.error("Error al agregar movimiento:", error);
            }
          };

         

    const changeStatusOfPayments = async () => {
      try {
        if (!Array.isArray(selectedLoans) || selectedLoans.length === 0) {
          console.warn("selectedLoans no es un array válido.");
          return;
        }

        
        for (const selectedLoan of selectedLoans) {
          console.log("ID => ",selectedLoan.id);
          // Traemos todos los documentos de ACCOUNTS
          const accountsSnapshot = await getDocs(collection(db, "ACCOUNTS"), where("number", "==", selectedAccount));
          
          let loanUpdated;
          loanUpdated = false
          for (const accountDoc of accountsSnapshot.docs) {
            
            const accountData = accountDoc.data();

            if (!accountData.loans || !Array.isArray(accountData.loans)) continue;

            const loanExists = accountData.loans.some(loan => loan.id === selectedLoan.id);
            
            
            if (!loanExists) continue;

            // se crea el nuevo objeto que le pasaremos para que se pueda actulizar todos los Loans
            const updatedLoans = accountData.loans.map(loan => {
              if (loan.id === selectedLoan.id) {
                return {...loan, status: "Pagado"};
              } 
              return loan;
            });

            const accountRef = doc(db, "ACCOUNTS", accountDoc.id);
            await updateDoc(accountRef, { loans: updatedLoans });
            console.log(`Loan ${selectedLoan.id} actualizado en doc ${accountDoc.id}`);
            loanUpdated = true;
            break;
          }

          if (!loanUpdated) {
            console.warn(`Loan ${selectedLoan.id} no se encontró en ningún documento.`);
          }
        }
        
        setSelectedLoans()
        setRefresh(!refresh)
        toast.current.show({ severity: 'success', summary: '¡Pago realizado!', detail: `Se hizo el pago de ${payTotal}€`, life: 3000 });
        console.log("Todos los préstamos seleccionados fueron actualizados.");
      
      } catch (error) {
        console.error("Error al actualizar los préstamos:", error);
      }
    };

    const filteredLoans = viewAllloans ? loans[0]?.loans.filter(loan => loan.userEmail !== currentUser.email)  : loans[0]?.loans.filter(loan => loan.userEmail === currentUser.email)

    return (
        <>
            <div className="sm:grid md:flex">
                <Navbar page="PRESTAMOS"></Navbar>
                <div className="md:ml-67 bg-gray-50 w-full h-[calc(100vh-74px)]">
                    {/**Header descktop */}
                    <Header dropdownData={accounts} dropdown title="PRESTAMOS" dropValue={selectedAccount} change={setSelectedAccount}></Header>
                    
                    {/**Header para móvil */}
                    <div className="md:hidden mt-[73px] mx-2">
                        <Dropdown loading={accounts.length <= 0 ? true : false} filter 
                        value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} options={accounts} optionLabel="label" 
                        placeholder="Selecciona una cuenta" className="w-full md:w-14rem" />
                    </div>

                    { screen.width > 550 
                    ? <div hidden={loans[0]?.loans?.length > 0 && selectedAccount ? false : true} className="m-2 md:my-2 bg-white border border-gray-200 rounded-md p-2 flex flex-col gap-3 text-xl md:text-3xl text-gray-500">
                            <Toolbar pt={{root : {class : 'flex justify-between w-full px-2 pb-5 pt-3 border-b border-b-gray-100'}}} start={getTotal} end={getButtonsOfAction}></Toolbar>
                            <Toast position={screen.width < 500 ? "top-center" : "top-right"} ref={toast} />
                            <DataTable className="w-full" removableSort selection={selectedLoans} onSelectionChange={!viewAllloans ? (e) => setSelectedLoans(e.value) : false}
                            value={viewAllloans ? loans[0]?.loans.filter(row => row.userEmail != currentUser.email) : loans[0]?.loans.filter(row => row.userEmail == currentUser.email)}>
                                {!viewAllloans 
                                ? <Column pt={{root : {className : 'w-3'}}} selectionMode="multiple" exportable={false}></Column> 
                                : <Column pt={{root : {className : 'w-3'}}} header={allHeader}></Column>}
                                <Column field="user" header="Usuario" body={userRow} sortable></Column>
                                <Column field="date" header="Fecha" sortable></Column>
                                <Column field="amount" header="Monto" body={amountRow} sortable></Column>
                                <Column field="status" header="Estado" body={statusRow} sortable></Column>
                            </DataTable>
                            <ButtonTop/>
                    </div>
                    : <div hidden={loans[0]?.loans?.length > 0 && selectedAccount ? false : true} className="m-2 md:my-2 bg-white border border-gray-200 rounded-md p-2 flex flex-col gap-3 text-xl md:text-3xl text-gray-500">
                      <Toolbar pt={{root : {class : 'flex justify-between w-full px-2 pb-5 pt-3 border-b border-b-gray-100'}}} start={getTotal} end={getButtonsOfAction}></Toolbar>
                      <div className="flex flex-col-reverse gap-2">
                        {filteredLoans?.map((loan, index) => (
                          <section className="border  rounded-md border-gray-200 bg-white gap-4 p-3">
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex gap-2.5 items-center">
                              <div className="rounded-full h-10 w-10 flex justify-center items-center" >
                                  <img src={loan.userPhoto} alt="Perfil" className="rounded-full h-10 w-10" />
                              </div>  
                                <div>
                                    <p className="text-sm text-gray-700 truncate">{loan.user}</p>
                                    <p className="text-xs text-gray-300 truncate">{loan.userEmail}</p>
                                </div>
                            </div>
                            <StatusTag severity={getSeverity(loan.status)} value={loan.status} icon={getIconStatus(loan.status)}></StatusTag>   
                          </div>
                          <div className="flex flex-col gap-1 mt-2">
                            <div className="flex flex-row justify-between items-center border-gray-100">
                              <span className="flex flex-row text-sm gap-1.5 items-center">
                                <CalendarDays strokeWidth="1.5" size={15}/>Fecha
                              </span>
                              <p className="text-sm text-gray-700">{loan.date}</p>
                            </div>
                            <div className="flex flex-row justify-between items-center border-gray-100">
                              <span className="flex flex-row items-center text-sm gap-1.5">
                                <Euro strokeWidth="1.5" size={15}/>Monto
                              </span>
                              <p className="text-md font-semibold text-gray-700">
                                {Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                              }).format(parseFloat(loan.amount))}</p>
                            </div>
                          </div>
                        </section>
                        ))}
                    </div>
                  </div>
                      }
                    {/**Este bloque se renderizará cuando se haga uan consulta a bbdd y no se encuentren resultados*/}
                    <div hidden={loans[0]?.loans?.length <= 0 ? false : true} className="m-2 md:mt-2 bg-white border h-[calc(100%-65px)] md:h-[calc(100vh-89px)] border-gray-200 rounded-md p-5 flex gap-3 justify-center items-center text-xl md:text-3xl text-gray-500">
                        <h1 className="text-center">No encontramos prestamos <span className="pi pi-sparkles" style={screen.width > 500 ? {fontSize: '1.5rem'} : {fontSize: '1rem'}}></span></h1>
                    </div>

                    <div hidden={!selectedAccount ? false : true} className="m-2 md:mt-2 bg-white border h-[calc(100%-65px)] md:h-[calc(100vh-89px)] border-gray-200 rounded-md p-5 flex gap-3 justify-center items-center text-xl md:text-3xl text-gray-500">
                        <h1>Selecciona una cuenta <span className="pi pi-search" style={screen.width > 500 ? {fontSize: '1.5rem'} : {fontSize: '1rem'}}></span></h1>
                    </div>
                </div>
            </div>
        </>
    )
}