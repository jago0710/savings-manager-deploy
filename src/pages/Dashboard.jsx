import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Chart } from 'primereact/chart';
import { Knob } from 'primereact/knob';

export default function Dashboard() {

  

  return (
    <>
      <div className="sm:grid md:flex">
        <Navbar page="DASHBOARD" />
          <div className="mt-15 md:ml-67 bg-gray-50 md:mt-0 w-full h-screen">
            <div className="hidden md:block w-full py-5 px-7 text-xl bg-white md:border-b md:border-b-gray-200">
                <h1 className="font-bold font-sans">DASHBOARD</h1>
            </div>
            <div className="p-5 grid lg:grid-cols-4 grid-cols-2 gap-5">
                <div className="h-48 rounded-md border border-gray-200 flex flex-col-reverse md:flex-row justify-around items-center bg-white">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <p className="text-3xl">252,35€</p>
                        <p className="text-xl">Ingresos <span className="pi pi-arrow-up-right" style={{ fontSize: '1.5rem', color : "#0384fc" }}></span></p>
                    </div>
                </div>
                <div className="h-48 rounded-md border border-gray-200 flex justify-around items-center bg-white">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <p className="text-3xl">125€</p>
                        <p className="text-xl">Retiros <span className="pi pi-arrow-down-right" style={{ fontSize: '1.5rem', color : "red"}}></span></p>
                    </div>
                </div>
                <div className="h-48 rounded-md border border-gray-200 flex justify-around items-center bg-white">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <p className="text-3xl">92,50€</p>
                        <p className="text-xl">Prestamos <span className="pi pi-building-columns" style={{ fontSize: '1.5rem', color : "#ffa600"}}></span></p>
                    </div>
                </div>
                <div className="h-48 rounded-md border border-gray-200 flex justify-around items-center bg-white">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <p className="text-3xl">70.512,98€</p>
                        <p className="text-xl">Benefios <span className="pi pi-chart-line" style={{ fontSize: '1.5rem', color : "#069c0b"}}></span></p>
                    </div>
                </div>
                <Knob value={60} onChange={(e) => setValue(e.value)} valueTemplate={'60%'} />
                {/** Abajo cuando este en mantenimiento */}
                <h1 hidden className="text-3xl md:text-4xl">EN MANTENIMIENTO...</h1>
            </div>


          </div>
          
      </div>
    </>
  );
}
