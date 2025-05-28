import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { db } from "../firebase/database.jsx";
import { addDoc, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import useUser from "../hook/useUser.jsx";
import { useParams } from "react-router";

export default function Savings() {
  const user = useUser();
  const { count } = useParams();
  const countParse = parseInt(count);

  console.log("USER", user);
  console.log("COUNT: ", count);
  
  

  const [countSavings, setCountSavings] = useState(null); // objeto cuenta o null
  const [totalMoney, setTotalMoney] = useState(0);
  const [inputValue, setInputValue] = useState(0); // input controlado

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
          
          setTotalMoney(docData.movements[docData.movements.length - 1].total);
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
  

  const saveValue = () => {
    const amount = parseFloat(inputValue);
    if (isNaN(amount) || amount === 0) {
      alert("Por favor ingresa un valor distinto de 0");
      return;
    }

    if (amount < 0) {
      if (!confirm("¿Estás seguro que quieres sacar dinero?")) {
        setInputValue("");
        return;
      }
    }

    // Actualizar totalMoney
    const newTotal = totalMoney + amount;
    setTotalMoney(newTotal);

    // Crear nuevo movimiento
    const today = new Date();
    const newMovement = {
      date: today.toLocaleDateString(),
      description: amount < 0 ? "Retiro" : "Ingreso",
      amount: amount.toFixed(2),
      total: newTotal.toFixed(2),
      "user": user?.displayName || "Anónimo",
    };
    
    addMovementToFirestore(newMovement);

    // Actualizar movimientos en estado
    setCountSavings((prev) => ({
      ...prev,
      movements: [...(prev?.movements || []), newMovement],
      total: newTotal,
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
        total: parseFloat(totalMoney) // opcional: actualizas también el saldo
      })

      console.log("✅ Movimiento agregado correctamente.");
    } else {
      console.error("❌ No se encontró la cuenta.");
    }
  } catch (error) {
    console.error("❌ Error al agregar movimiento:", error);
  }
};

  if (!countSavings) {
    return (
      <section className="flex">
        <Navbar />
        <div>
          <h3>Selecciona la cuenta que quieres ver</h3>
        </div>
      </section>
    );
  }

  return (
    <section className="flex">
      <Navbar />
      <div className="flex flex-col gap-4 lg:gap-7 lg:m-8 w-full ">
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
          <div className="border border-gray-300 rounded-lg p-5 flex gap-2 flex-col">
            <p className="font-bold text-2xl mb-4">Acciones Rápidas</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              <label>Ingresa una cantidad:</label>
              <input
                className="border py-2 rounded-lg text-xl font-medium text-center"
                type="number"
                placeholder="Ingresa una cantidad..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="bg-black text-white p-2 rounded-lg"
                onClick={saveValue}
                type="button"
              >
                Registrar
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2">
              {[5, 10, 20, 50].map((num) => (
                <button
                  key={num}
                  className="rounded-lg border py-2 transition duration-200 hover:font-bold lg:hover:scale-110"
                  onClick={() => setInputValue(num.toString())}
                >
                  {Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                  }).format(num)}
                </button>
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
                  <p>{movement.user}</p>
                </div>
              ))
            ) : (
              <p>No hay movimientos.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
