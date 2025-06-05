import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { db } from "../firebase/database.jsx";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import useUser from "../hook/useUser.jsx";
import { useParams } from "react-router";
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import { Toast } from 'primereact/toast';
        
         

export default function Savings() {
  const user = useUser();
  const { count } = useParams();
  const countParse = parseInt(count);

  console.log("USER", user);
  console.log("COUNT: ", count);
  
  const toast = useRef(null);

  const [countSavings, setCountSavings] = useState(null); 
  const [totalMoney, setTotalMoney] = useState(0);
  const [inputValue, setInputValue] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [typeMovement, setTypeMovement] = useState("Ingresar")

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
          const docData = querySnapshot.docs[0].data();
          const movements = Array.isArray(docData.movements) ? docData.movements : [];
          setCountSavings({ ...docData, movements });
          console.log("-------", docData.movements[docData.movements.length - 1].total);
          
          setTotalMoney(parseFloat(docData.movements[docData.movements.length - 1].total));
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!isNaN(countParse)) {
      getDates();
    }
  }, [countParse]);

  console.log("DATES-COUNT",countSavings);
  

  const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: `¿Estas seguro de retirar ese dinero?`,
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            acceptLabel: 'Acceptar',
            rejectLabel: 'Cancelar',
            accept,
            reject
        });
  };

  const accept = () => {
        toast.current.show({ severity: 'success', summary: '¡Retiro con exito!', detail: `Se ha retirado ${inputValue}€`, life: 3000 });
        saveValue()
      };

  const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Operación cancelada', detail: 'La operación de ha cancelado', life: 3000 });
    };

  const saveValue = () => {
    
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount === 0) {
      setShowDialog(!showDialog);
      return;
    }

    let newTotal = null;

    // Actualizar totalMoney
    if (typeMovement === "Retirar") {
      
      newTotal = totalMoney - amount;
      setTotalMoney(newTotal);
    } else if (typeMovement === "Ingresar"){
      newTotal = totalMoney + amount;
      setTotalMoney(newTotal);
    } else {
      console.log("No se sumo ni resto el valor");
      
    }


    // Crear nuevo movimiento
    const today = new Date();
    const newMovement = {
      date: today.toLocaleDateString(),
      description: typeMovement,
      amount: typeMovement === "Ingresar" ? amount.toFixed(2) : -amount.toFixed(2),
      total: newTotal.toFixed(2),
      "user": user?.displayName || "Anónimo",
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

  const addMovementToFirestore = async (newMovement) => {
  try {
    // Paso 1: buscar el documento de la cuenta por número
    const q = query(collection(db, "ACCOUNTS"), where("number", "==", parseInt(count)));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "ACCOUNTS", querySnapshot.docs[0].id); // obtenemos el ID del documento

      // Paso 2: agregamos el nuevo movimiento al array
      await updateDoc(docRef, {
        movements: arrayUnion(newMovement),
        total: parseFloat(totalMoney) //actualizas también el saldo
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
        <Navbar />
        <div className="h-screen w-full flex justify-center items-center">
          <ProgressSpinner />
        </div>
      </section>
    );
  }

  return (
    <section className="sm:grid md:flex">
      <Navbar />
      <div className="flex flex-col w-full mt-15 md:mt-0">
        <div className="w-full py-5 px-5 flex gap-1 text-xl border-b border-b-gray-200">
          <h1 className="font-bold font-sans">MOVIMIENTOS</h1>
        </div>
      <div className="flex flex-col gap-4 lg:gap-7 w-full p-2 md:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-7">
          <div className="border border-gray-300 rounded-lg p-5 flex flex-col gap-2">
            <p className="font-bold text-2xl">Resumen de la cuenta</p>
            <b className="font-bold text-3xl">
              Saldo:{" "}
              {Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
              }).format(totalMoney)}
            </b>
            <p className="text-gray-600">Nº de cuenta: {count}</p>
          </div>
          {/**ACCIONES RÁPIDAS PAR INGRESAR DINERO O RETIRAR */}
          <div className="border border-gray-300 rounded-lg p-5 flex gap-2 flex-col">
            <p className="font-bold text-2xl mb-4">Acciones Rápidas</p>
            <div className="grid gap-2 sm:grid-cols-1 lg:grid-cols-1 ">
              <div className="flex gap-3 items-center">
                <Dropdown className="w-1/2" value={typeMovement} placeholder="Seleccionar una opción" onChange={(e) => setTypeMovement(e.value)} options={movementsOptions} optionLabel="label"  />
                <InputNumber className="p-inputtext-md w-1/2" inputStyle={{width: '100%'}} placeholder="Ingresa una cantidad..." value={inputValue} onValueChange={(e) => setInputValue(e.value)} step={0.25} showButtons mode="currency" currency="EUR" locale="es-ES" decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" min={0} />
              </div>
              <div>
              <Toast ref={toast} />
              <ConfirmPopup />
              <Button className="w-full" type="submit" label="Registrar movimiento" severity="secondary" text raised onClick={typeMovement === "Retirar" && inputValue ? confirm : saveValue}/>
              <Dialog headerStyle={{width : "80vw"}} contentStyle={{width : "80vw"}} header="Upps... " visible={showDialog}  onHide={() => {if (!showDialog) return; setShowDialog(false); }}>
                <p className="m-0">
                    Puede que el valor que hayas ingresado sea un 0. <br /><br />
                    O un simbolo, caracter o letra.
                </p>
            </Dialog>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2">
              {[5, 10, 20, 50].map((num) => (
                <Button key={num} onClick={() => setInputValue(num.toString())}  className="py-2 transition duration-200 hover:font-bold lg:hover:scale-110" type="submit" 
                label={Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(num)} severity="secondary" text raised></Button>
              ))}
            </div>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-5 w-full">
          <p className="font-bold text-2xl mb-5">Historial de movimientos</p>
          <div className="grid grid-cols-5 border-b border-b-gray-300 pb-5 text-center">
            <p>Fecha</p>
            <p>Descripción</p>
            <p>Monto</p>
            <p>Total</p>
            <p>Usuario</p>
          </div>
          <div className="flex flex-col-reverse">
            {countSavings.movements && countSavings.movements.length > 0 ? (
              countSavings.movements.map((movement, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 justify-around py-7 border-b-gray-200 border-b text-center"
                >
                  <p>{movement.date}</p>
                  <p>{movement.description}</p>
                  <p
                    style={{
                      color: parseFloat(movement.amount) < 0 ? "red" : "green",
                    }}
                  >
                    {Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(movement.amount))}
                  </p>
                  <p>
                    {Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: "EUR",
                    }).format(parseFloat(movement.total))}
                  </p>
                  <p className="truncate">{movement.user}</p>
                </div>
              ))
            ) : (
              <p>No hay movimientos.</p>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
