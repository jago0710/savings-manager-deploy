import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { db } from "../firebase/database.jsx";
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import useUser from "../hook/useUser.jsx";
import { useParams } from "react-router";
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from 'primereact/toast';
import { ScrollTop } from "primereact/scrolltop";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import ButtonTop from "../components/ButtonTop.jsx";
import { ArrowUpRight, HandCoins, Handshake, PiggyBank, ArrowDownLeft, CalendarDays, FileText, DollarSign, Euro, TrendingUp, TrendingDown } from "lucide-react";
import { Tag } from "primereact/tag"
        
         

export default function Savings() {
  const user = useUser();
  const { count } = useParams();
  const countParse = parseInt(count);
  
  const toast = useRef(null);

  const [countSavings, setCountSavings] = useState(null); 
  const [totalMoney, setTotalMoney] = useState(0);
  const [inputValue, setInputValue] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [typeMovement, setTypeMovement] = useState("Ingresar")
  const [detailMovement, setDetailMoviment] = useState();
  const [viewModalMovement, setViewModalMovement] = useState(false);

  const movementsOptions = [
    {label: "Ingresar", value: "Ingresar"},
    {label: "Retirar", value: "Retirar"}
  ]

  useEffect(() => {
    const getDates = async () => {
      try {
        const q = query(collection(db, "ACCOUNTS"), where("number", "==", countParse));
        const querySnapshot = await getDocs(q)
        
        if (!querySnapshot.empty) {
          const docData =  querySnapshot.docs[0].data();
          const movements = Array.isArray(docData.movements) ? docData.movements : [];
          setCountSavings({ ...docData, movements });
          
          setTotalMoney(parseFloat(docData.movements[docData.movements.length - 1].total));
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!isNaN(countParse)) {
      getDates();
    }
  }, [countParse, movementsOptions]);

  const confirmDetails = () => {
    return(
      <div className="flex flex-col gap-2">
        <p><b>Prestamo:</b> Se te registrará el prestamo y tendrás que devolver el dinero</p>
        <p><b>Beneficio:</b> No se te pedirá la devolución del dinero</p>
      </div>
    )
  }

  const confirm = (event) => {
        confirmDialog({
            target: event.currentTarget,
            header: 'Confirma el tipo de retiro',
            message: confirmDetails,
            icon: 'pi pi-exclamation-circle',
            defaultFocus: 'accept',
            acceptLabel: 'Prestamo',
            rejectLabel: 'Beneficio',
            accept,
            reject
        });
  };

  const accept = () => {
        toast.current.show({ severity: 'success', summary: '¡Prestamo realizado!', detail: `Te has prestado ${inputValue}€`, life: 3000 });
        saveValue("Prestamo")
        saveToLoans()
      };

  const reject = () => {
        toast.current.show({ severity: 'success', summary: '¡Retiro con exito!', detail: `Se ha retirado en beneficio ${inputValue}€`, life: 3000 });
        saveValue()
    };
  
  const saveToLoans = () => {

    const amount = parseFloat(inputValue);

    const today = new Date();
    //Aqui creo un nuevo prestamo
    const newLoan = {
      id: crypto.randomUUID(),
      userEmail: user?.email,
      "user": user?.displayName,
      userPhoto: user?.photoURL,
      amount: amount,
      status: "Pendiente",
      date: today.toLocaleDateString(),
    }

    addLoanToFirestore(newLoan);
    setInputValue("");
  }

  const saveValue = (prestamo) => {
    console.log(prestamo);
    
    
    const amount = parseFloat(inputValue);

    let newTotal = null;

    // Actualizar totalMoney
    if (typeMovement === "Retirar" && (totalMoney - amount) >= 0) {
      newTotal = parseFloat(totalMoney) - parseFloat(amount);
      setTotalMoney(newTotal);
    } else if (typeMovement === "Ingresar"){
      newTotal = parseFloat(totalMoney) + parseFloat(amount);
      setTotalMoney(newTotal);
    } else {
      console.log("No se sumo ni resto el valor");
      
    }

    let type;

    if (!prestamo) {
      type = typeMovement
    } else {
      type = prestamo
    }

    // Crear nuevo movimiento
    const today = new Date();
    const newMovement = {
      id: crypto.randomUUID(),
      date: today.toLocaleDateString(),
      description: type,
      amount: typeMovement === "Ingresar" ? amount : -amount,
      total: newTotal,
      "user": user?.displayName,
      userPhoto: user?.photoURL
    };
    
    addMovementToFirestore(newMovement);

    // Actualizar movimientos en estado
    setCountSavings((prev) => ({
      ...prev,
      movements: [...(prev?.movements || []), newMovement]
    }));

    setInputValue("");
    // Aquí podrías agregar la lógica para actualizar en Firebase también
  };

const addLoanToFirestore = async (newLoan) => {
  try {
    const q = query(collection(db, "ACCOUNTS"), where("number", "==", parseInt(count)));
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      const docRef = doc(db, "ACCOUNTS", querySnapshot.docs[0].id)
        // Actualizo y agrego el Prestamo
      await updateDoc(docRef, {
        loans : arrayUnion(newLoan)
      })
    } else {
      console.log("No se encotró la cuenta");
    }
  } catch (error){
    console.error("Error al agregar prestamo:", error);
  }
}

const addMovementToFirestore = async (newMovement) => {
  try {
    //Busco el documento de la cuenta por el número
    const q = query(collection(db, "ACCOUNTS"), where("number", "==", parseInt(count)));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "ACCOUNTS", querySnapshot.docs[0].id); // obtengo el ID del documento para actualizar el docmento

      // Actualizo y agrego el movimiento
      await updateDoc(docRef, {
        movements: arrayUnion(newMovement),
        total: (parseFloat(totalMoney) + parseFloat(inputValue))
      })

      console.log("Movimiento agregado correctamente.");
    } else {
      console.error("No se encontró la cuenta.");
    }
  } catch (error) {
    console.error("Error al agregar movimiento:", error);
  }
};

  if (!countSavings) {
    return (
      <section className="sm:grid md:flex">
        <Navbar page="MOVIMIENTOS"/>
        <div className="h-screen w-full flex justify-center items-center">
          <ProgressSpinner />
        </div>
      </section>
    );
  }

  const viewMovement = (movement) => {
    setDetailMoviment(movement)
    setViewModalMovement(true)
  }

  const verify = (e) => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount === 0) {
      setShowDialog(!showDialog);
      return;
    }
    
    if (typeMovement === "Retirar" && inputValue && (totalMoney - inputValue) >= 0 ) {
      confirm(e)
    } else if (typeMovement === "Retirar" && (totalMoney - inputValue) < 0) {
      toast.current.show({ severity: 'warn', summary: 'Movimiento invalido!', detail: 'La cuenta no puede quedar en negativo o números rojos', life: 3000 });
    }else{
      saveValue()
    }
    
  }

  const getHeaderDetail = (movement) => {
    return(
      <div className="flex items-center gap-1 ">
        {movement.description == "Ingresar" ? <ArrowUpRight color="#0ea62a" strokeWidth="2" size={22}/> 
                : movement.description == "Retirar" ? <ArrowDownLeft color="#e62e2e" strokeWidth="2" size={22}/> 
                : movement.description == "Prestamo" ?  <HandCoins color="#f27612" strokeWidth="2" size={22}/> 
                :  movement.description == "Pago" ? <Handshake color="#17a2ce" strokeWidth="2" size={22}/> : <PiggyBank/>}
        <p className="text-lg" >Detalles del movimiento</p>
      </div>
    )
  }

  const getSeverity = (status) => {
            switch (status) {
              case 'Ingresar':
                    return 'success'
                case 'Pago':
                    return 'primary'
                case 'Prestamo':
                    return 'warning'
                case 'Retirar':
                    return 'danger'
                default:
                    return 'info'
            }
          }

  return (
    <section className="sm:grid md:flex overflow-auto bg-gray-50">
      <Navbar page="MOVIMIENTOS"/>
      <div className="flex flex-col w-full mt-16 md:mt-0 md:ml-67 overflow-auto">
        <div className="hidden w-full py-5 px-5 md:flex gap-1 text-xl border-b bg-white border-b-gray-200">
          <h1 className="font-bold font-sans">MOVIMIENTOS</h1>
        </div>
        <div className="flex flex-col gap-2 lg:gap-2 w-full p-2 md:p-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-2">
          <div className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 bg-white">
            <p className="font-bold text-2xl">Resumen de la cuenta</p>
            <b className="font-bold text-3xl">
              Saldo:{" "}
              {Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(parseFloat(totalMoney))}
            </b>
            <p className="text-gray-600">Nº de cuenta: {count}</p>
          </div>
          {/**ACCIONES RÁPIDAS PAR INGRESAR DINERO O RETIRAR */}
          <div className="border border-gray-300 rounded-lg p-4 flex gap-2 flex-col bg-white">
            <p className="font-bold text-2xl mb-2">Acciones Rápidas</p>
            <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-1 ">
              <div className="flex flex-col md:flex-row gap-3 items-center">
                <Dropdown className="w-full md:w-1/2" value={typeMovement} placeholder="Seleccionar una opción" onChange={(e) => setTypeMovement(e.value)} options={movementsOptions} optionLabel="label"  />
                <InputNumber className="p-inputtext-md w-full" inputStyle={{width: '100%'}} placeholder="Ingresa una cantidad..." value={inputValue} onValueChange={(e) => setInputValue(e.value)} step={0.25} showButtons mode="currency" currency="EUR" locale="es-ES" decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" min={0} />
              </div>
              <div className="flex flex-col gap-2">
              <Toast position={screen.width < 500 ? "top-center" : "top-right"} ref={toast} />
              <ConfirmDialog position="top" />
            {screen.width < 480 ? null 
            : <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
              {[5, 10, 20, 50].map((num) => (
                <Button key={num} onClick={() => inputValue ? setInputValue(inputValue + parseFloat(num)) : setInputValue(parseFloat(num))} type="submit" 
                label={Intl.NumberFormat("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  }).format(num)} severity="secondary" text raised></Button>
              ))}
            </div>}
              <Button pt={{root : {class : 'bg-gray-500 text-white rounded-md w-full p-3'}}} className="w-full" type="submit"  label="Registrar movimiento" severity="secondary" text raised onClick={(e) => verify(e)}/>
              <Dialog headerStyle={{width : "80vw"}} contentStyle={{width : "80vw"}} header="Upps... " visible={showDialog}  onHide={() => {if (!showDialog) return; setShowDialog(false); }}>
                <p className="m-0">
                    Puede que el valor que hayas ingresado sea un 0. <br /><br />
                    O un simbolo, caracter o letra.
                </p>
            </Dialog>
              </div>
            </div>
          </div>
        </div>
        {screen.width > 550 ? 
        <div className="border border-gray-300 bg-white rounded-lg p-4 w-full">
          <p className="font-bold text-2xl mb-5">Historial de movimientos</p>
          <div className="grid grid-cols-4 md:grid-cols-5 border-b border-b-gray-300 pb-5 text-center">
            <p>Fecha</p>
            <p className="hidden md:block">Descripción</p>
            <p>Monto</p>
            <p>Total</p>
            <p>Usuario</p>
          </div>
          <div className="flex flex-col-reverse">
            {countSavings.movements && countSavings.movements.length > 0 ? (
              countSavings.movements.map((movement, index) => (
                <div 
                  onClick={() => viewMovement(movement)}
                  key={index}
                  className="grid grid-cols-4 md:grid-cols-5 justify-around py-5 md:py-5 border-b-gray-200 border-b text-center hover:bg-blue-100 "
                >
                  <p>{movement.date}</p>

                  <p className={movement.description == "Ingresar" ? "hidden md:block" : movement.description == "Retirar" ? "hidden md:block" : movement.description == "Prestamo" ?  "hidden md:block" : "hidden md:block"}>
                    {movement.description}
                  </p>
                  <p className={movement.description == "Ingresar" ? "text-green-700" : movement.description == "Retirar" ? "text-red-600" : movement.description == "Prestamo" ?  "text-orange-500" : "text-blue-500"}>
                    {Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(movement.amount))}
                  </p>
                  <p>
                    {Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(movement.total))}
                  </p>

                    <span className="flex items-center gap-2">
                    <img className="rounded-full h-7 w-7" src={movement.userPhoto} alt="Perfil de usuario" />
                    <p className="truncate">{movement.user}</p>
                  </span>
                </div>
              ))
            ) : (
              <p>No hay movimientos.</p>
            )}
          </div>
        </div> 
        :
        // Cards de movimientos para móvil 
        <div className="border border-gray-300 bg-white rounded-lg w-full">
          <p className="font-bold text-2xl m-4">Historial de movimientos</p>
          <div className="flex flex-col-reverse">
          {countSavings.movements.map((movement, index) => (
            <div  onClick={() => viewMovement(movement)} key={index} className="border h-15 rounded-md border-gray-200 bg-white flex justify-between gap-4 mx-2 my-1 p-2 items-center">
              <div className="flex gap-2.5 items-center">
              <div className="rounded-full h-10 w-10 flex justify-center items-center" >
                  <img src={movement.userPhoto} alt="Perfil" className="rounded-full h-10 w-10" />
              </div>         
              <div>
                <div className="flex flex-row gap-1 items-center justify-start">
                {movement.description == "Ingresar" ? <ArrowUpRight color="#0ea62a" strokeWidth="1.5" size={20}/> 
                : movement.description == "Retirar" ? <ArrowDownLeft color="#e62e2e" strokeWidth="1.5" size={20}/> 
                : movement.description == "Prestamo" ?  <HandCoins color="#f27612" strokeWidth="1.5" size={20}/> 
                :  movement.description == "Pago" ? <Handshake color="#17a2ce" strokeWidth="1.5" size={20}/> : <PiggyBank size={20}/>}
                <p>{movement.description}</p>
              </div>              
                <p className="text-xs text-gray-300">{movement.date}</p>
              </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <p className="font-semibold">
                  {Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(movement.amount))}</p>
                <p className="text-gray-300 text-sm">{Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(movement.total))}</p>
              </div>
            </div>
        ))}
          </div>
        </div>
        }
        <Dialog headerStyle={ {width : "90vw"}} contentStyle={{width : "90vw"}} header={() => getHeaderDetail(detailMovement)} visible={viewModalMovement}  onHide={() => {if (!viewModalMovement) return; setViewModalMovement(false); }}>
                {detailMovement
                ?
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                      <img className="rounded-full" src={detailMovement.userPhoto} alt="Perfil" height={35} width={35}/>
                      <p className="truncate">{detailMovement.user}</p>
                  </div>
                  
                  <div className="flex flex-row justify-between items-center">
                    <span className="flex flex-row text-sm gap-1.5">
                      <CalendarDays strokeWidth="1.5" size={20}/>Fecha
                    </span>
                    <p>{detailMovement.date}</p>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <span className="flex flex-row text-sm gap-1.5">
                      <FileText strokeWidth="1.5" size={20}/>Descripción
                    </span>
                    <p>{detailMovement.description}</p>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <span className="flex flex-row text-sm gap-1.5">
                      <Euro strokeWidth="1.5" size={20}/>Monto
                    </span>
                    <p className={
                      detailMovement.description == "Ingresar" ? "text-green-600 text-xl font-bold" 
                      : detailMovement.description == "Retirar" ? "text-red-600 text-xl font-bold" 
                      : detailMovement.description == "Prestamo" ?  "text-orange-500 text-xl font-bold" 
                      : "text-cyan-500  text-xl font-bold"}>
                      {Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(detailMovement.amount))}</p>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <span className="flex flex-row text-sm gap-1.5">
                      {detailMovement.amount > 0 
                      ? <TrendingUp strokeWidth="1.5" size={20}/>
                      : <TrendingDown strokeWidth="1.5" size={20}/>}
                      Total
                    </span>
                    <p className="text-xl font-bold">
                      {Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(detailMovement.total))}</p>
                  </div>
                </div>
                :<p>No hay datos.</p>}
            </Dialog>
      </div>
      <ScrollTop target="parent" threshold={100} className="w-2rem h-2rem border-round bg-primary" icon="pi pi-arrow-up text-base" />
      </div>
      <ButtonTop></ButtonTop>
    </section>
  );
}
