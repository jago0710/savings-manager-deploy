import { ChartColumnIncreasing, CreditCard, HandCoins, HelpCircle, PiggyBank, Plus, Settings } from "lucide-react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import RedirectButton from "../components/RedirectButton";
import useUser from "../hook/useUser"

export default function Home(){
const user = useUser();

console.log("=> ", user);

    return(
        <>
           <div className="sm:grid md:flex">
                <Navbar page="INICIO"/>
                <div className="md:ml-67 bg-gray-50 w-full h-[calc(100vh-74px)]">
                  <Header title="INICIO"></Header>
                  <div className="mt-18 md:mt-2 mx-2 rounded-md bg-white w-[calc(100% - 4px)] border border-gray-200 p-2">
                    <p className="text-2xl" >Bienvenido a <b className="text-red-700 welcome"><a href="/home"><span className="mr-0.5">/</span>Savings Bank</a></b></p>
                  </div>
                  <div className="flex flex-col sm:flex-row w-[calc(100% - 4px)] md:mt-2 m-2 gap-2">
                    <div className="mt-0 bg-white w-full  border border-gray-200 rounded-md flex flex-col justify-between gap-2 p-5 ">
                      <h1 className="text-xl mb-4 font-semibold">Acciones Rápidas</h1>
                      {/** COMPONENTE */}
                      <RedirectButton href="/accounts" title="Gestionar Cuentas" description="Ver y administrar todas tus cuentas" icon={CreditCard} BorderColor="rgba(0, 158, 25, 0.8)" backgroundColor="rgba(0, 224, 35, 0.08)"/>
                      <RedirectButton href="/loans" title="Ver Préstamos" description="Consulta el estado de tus préstamos" icon={HandCoins} BorderColor="rgba(255, 149, 6, 0.8)" backgroundColor="rgba(255, 149, 6, 0.09)"/>
                      <RedirectButton href="/dashboard" title="Ir al Dashboard" description="Análisis y reportes financieros" icon={ChartColumnIncreasing} BorderColor="rgba(4, 87, 246, 0.8)" backgroundColor="rgba(4, 87, 246, 0.08)"/>
                      {/** FIN DE COMPONENTE */}
                    </div>
                    <div className="mt-0 bg-white w-full  border border-gray-200 rounded-md flex flex-col justify-between gap-2 p-5 ">
                      <h1 className="text-xl mb-4 font-semibold">Funciones adicionales</h1>

                      <RedirectButton href="/settings" title="Configuración" description="Personaliza tu experiencia" icon={Settings} BorderColor="rgba(213, 213, 213, 0.8)" backgroundColor="rgba(235, 235, 235, 0.14)" />
                      <RedirectButton href="/help" title="Centro de ayuda" description="Soporte y documentación guía" icon={HelpCircle} BorderColor="rgba(4, 87, 246, 0.8)" backgroundColor="rgba(4, 87, 246, 0.08)"/>
                      <RedirectButton href="/accounts/true" title="Agregar Nueva Cuenta" description="Crea una nueeva cuenta" icon={Plus} BorderColor="rgba(4, 87, 246, 0.8)" backgroundColor="rgba(4, 87, 246, 0.08)"/>
                    </div>
                  </div>
                  <div className="bg-white w-[calc(100% - 4px)] h-[calc(100vh-292px)] md:mt-2 m-2 border border-gray-200 rounded-md flex justify-between items-center p-2">

                  </div>
                </div>
           </div>
        </>
    )
}