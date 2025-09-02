import { Knob } from "primereact/knob";
import { useEffect, useState } from "react";
import { Recharts } from "./Recharts";

export default function TableDashboard({ hidden, totalCurrent, totalTarget, TotalIncome, totalRatreats, totalLoans, totalBenefits, chartData}) {

    const [porcentajeOb, setporcentajeOb] = useState(); //Porcentaje del objetivo a llegar

        const porcentaje = Number(parseFloat((totalCurrent / totalTarget) * 100).toFixed(2))
      
    
    return(
        <div className="md:mt-0  p-2 grid lg:grid-cols-4 grid-cols-2 gap-2" hidden={hidden}>
                <div className="h-30 md:h-40 rounded-md border border-gray-200 flex justify-around items-center bg-white col-span-2 md:col-span-4">
                    <div className="w-full text-center flex flex-row gap-5 justify-center-safe items-center">
                        <div>
                            <p className="text-xl sm:text-3xl">
                                {Intl.NumberFormat("de-DE", {
                                    style: "currency",
                                    currency: "EUR",
                                    }).format(parseFloat(totalCurrent))}
                            </p> {/**Total actual */}
                            <p>Saldo</p>
                        </div>
                        <Knob value={porcentaje} onChange={(e) => setValue(e?.value)} valueTemplate={porcentaje + "%"} />
                        <div>
                            <p className="text-xl sm:text-3xl">
                            {Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(parseFloat(totalTarget))}    
                            </p> {/**Total objetivo */}
                            <p>Objetivo</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-4 bg-white border border-gray-200 rounded-md p-2">
                        <p className="text-center py-2 text-gray-600">Registros mensuales</p>
                        <Recharts />
                    </div>

                <div className="h-35 md:h-40 rounded-md border border-gray-200 flex flex-col-reverse md:flex-row justify-around items-center bg-white hover:scale-102 hover:bg-blue-50 hover:border-gray-300 transition-all duration-300">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <span className="pi pi-arrow-up-right" style={{ fontSize: '1.5rem', color : "#0374ff" }}></span>
                        <p className="text-2xl sm:text-3xl">
                        {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        }).format(parseFloat(TotalIncome))}    
                        </p> {/**Total ingresos */}
                        <p className="text-xl">Ingresos</p>
                    </div>
                </div>

                <div className="h-35 md:h-40 rounded-md border border-gray-200 flex justify-around items-center bg-white hover:scale-102 hover:bg-blue-50 hover:border-gray-300 transition-all duration-300">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <span className="pi pi-arrow-down-right" style={{ fontSize: '1.5rem', color : "red"}}></span>
                        <p className="text-2xl sm:text-3xl">
                        {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        }).format(parseFloat(totalRatreats - totalRatreats * 2))}    
                        </p> {/**Total retiros */}
                        <p className="text-xl">Retiros</p>
                    </div>
                </div>

                <div className="h-35 md:h-40 rounded-md border border-gray-200 flex justify-around items-center bg-white hover:scale-102 hover:bg-blue-50 hover:border-gray-300 transition-all duration-300">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <span className="pi pi-building-columns" style={{ fontSize: '1.5rem', color : "#F98510"}}></span>
                        <p className="text-2xl sm:text-3xl">
                        {Intl.NumberFormat("de-DE", {
                            style: "currency",
                            currency: "EUR",
                        }).format(parseFloat(totalLoans - totalLoans * 2))}    
                        </p> {/**Total prestamos */}
                        <p className="text-xl">Prestamos</p>
                    </div>
                </div>

                <div className="h-35 md:h-40 rounded-md border border-gray-200 flex justify-around items-center bg-white hover:scale-102 hover:bg-blue-50 hover:border-gray-300 transition-all duration-300">
                    <div className="w-full text-center flex flex-col gap-2 justify-center items-center">
                        <span className="pi pi-chart-line" style={{ fontSize: '1.5rem', color : "#069c0b"}}></span>
                        <p className="text-2xl sm:text-3xl">
                            {Intl.NumberFormat("de-DE", {
                                style: "currency",
                                currency: "EUR",
                            }).format(parseFloat(totalBenefits - totalBenefits * 2))}    
                        </p> {/**Total beneficios */}
                        <p className="text-xl">Benefios</p>
                    </div>
                </div>

                {/**Aqui se mostrarán los movimientos del tipo de movimiento seleccionado */}
                {/**
                 *  |____|____|____|____|____|____|
                 *  |____|____|____|____|____|____|
                 *  |____|____|____|____|____|____|
                 *  |____|____|____|____|____|____|
                 */}

            </div>
    )
}