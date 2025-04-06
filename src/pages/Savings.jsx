import React from "react";
import { useState } from "react";
import { usersCount } from "../database/data.js";



export default function Savings({ username }) {
  const [countSavings, setCountSavings] = useState(null);
  const [totalMoney, setTotalMoney] = useState(0);
  const [stateCount, setStateCount] = useState(usersCount);

console.log(stateCount);
console.log(username)
  
  const changeStateCount = () => {
    setStateCount(...stateCount)
  }

  console.log(countSavings);
  console.log("Money: " + totalMoney);

  const setCount = (e) => {
    setCountSavings(parseFloat(e.target.value));
  };

  const saveMovement = (amount) => {
    const today = new Date();
    setStateCount({...stateCount, movements: [
      ...stateCount.movements, 
      { 
        date : today.toLocaleDateString(),
        description: amount < 0 ? "Retiro" : "Ingreso",
        amount: Intl.NumberFormat("es-Es", {style: "currency", currency: "EUR"}).format(amount), 
        total: Intl.NumberFormat("es-Es", {style: "currency", currency: "EUR"}).format(totalMoney + parseFloat(amount)), 
        user: username
      }
    ]
  }
  )
  }

  const saveValue = (e) => {
    if (parseFloat(e.target.value) === 0) {
      alert("No se puede ingresar el valor 0");
    } else if (parseFloat(e.target.value) < 0) {
      // eslint-disable-next-line no-restricted-globals
      let check = confirm("Estas seguro que quieres sacar dinero?");
      if (check === true) {
        setTotalMoney(parseFloat(totalMoney) + parseFloat(e.target.value));
        saveMovement(e.target.value);
        setCountSavings(0);
      } else {
        setCountSavings(0);
      }
    } else {
      setTotalMoney(parseFloat(totalMoney) + parseFloat(e.target.value));
      saveMovement(e.target.value)
      setCountSavings(0);
    }
  };

  const changeValue = (e) => {
    setCountSavings(parseFloat(e.target.value));
  };

  const numbersOfShortcurs = [5, 10, 20, 50];

  const getnumbersOfShortcurs = () => {
    return numbersOfShortcurs.map((number) => (      
      <button
      key={number}
        className="rounded-lg border py-2 transition duration-200 hover:font-bold lg:hover:scale-110"
        onClick={changeValue}
        value={number}
      >
        {Intl.NumberFormat("es-ES", {style: "currency", currency: "EUR" }).format(number)}
      </button>
    )
  );
  };

  const getMovements = () => {
    return stateCount.movements.map((movement) => (
        <div className="grid grid-cols-5 justify-around py-7 border-b-gray-200 border-b text-center">
          <p>{movement.date}</p>
          <p>{movement.description}</p>
          <p style={{color: parseFloat(movement.amount) < 0 ? 'red' : 'green'}}>{movement.amount}</p>
          <p>{movement.total}</p>
          <p >{movement.user}</p>
        </div>
    )
  )
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-7">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-7">
        <div className="border border-gray-300 rounded-lg p-5 flex flex-col gap-2">
          <p className="font-bold text-2xl">Resumen de la cuenta</p>
          <b className="font-bold text-3xl"> Saldo: {Intl.NumberFormat("es-Es", { style: "currency", currency: "EUR" }).format(totalMoney)}</b>
          <p className="text-gray-600">Nº de cuenta: {stateCount.id}</p>
        </div>
        <div className="border border-gray-300 rounded-lg p-5 flex gap-2 flex-col">
          <p className="font-bold text-2xl mb-4">Acciones Rápidas</p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            <label>
              Ingresa una cantidad:
            </label>
            <input
              className="border py-2 rounded-lg text-xl font-medium text-center"
              onChange={setCount}
              type="number"
              placeholder="Ingresa una cantidad..."
              value={countSavings}
            ></input>
            <button className="bg-black text-white p-2 rounded-lg" onClick={saveValue} value={countSavings} type="submit">Registrar</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2">
          {getnumbersOfShortcurs()}
          </div>
        </div>
    </div>
    <div className="border border-gray-300 rounded-lg p-5 w-full">
    <p className="font-bold text-2xl mb-5">Hitorial de movimientos</p>
    <div className="grid grid-cols-5 border-b border-b-gray-300 pb-5 text-center">
          <p onClick={changeStateCount}>Fecha</p>
          <p>Descripción</p>
          <p>Monto</p>
          <p>Total</p>
          <p>Usuario</p>
        </div>
        <div className="flex flex-col-reverse">
        {getMovements()}
        </div>
  </div>
  </div>
  );
}
