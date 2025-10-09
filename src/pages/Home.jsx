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
                  <div className="flex flex-col sm:flex-row w-[calc(100% - 4px)] md:mt-2 m-2 gap-2">
                    <div className="md:mt-0 bg-white w-full border border-gray-200 rounded-md flex flex-col justify-between gap-3 p-4 mt-16">
                      <h1 className="text-xl mb-1 font-semibold">Acciones rápidas</h1>
                      
                      <RedirectButton href="/accounts" title="Gestionar cuentas" description="Realizar y ver movimientos" icon={CreditCard} BorderColor="rgba(0, 158, 25, 0.5)" backgroundColor="rgba(0, 224, 35, 0.03)" iconColor="rgba(0, 158, 35, 0.8)"/>
                      <RedirectButton href="/loans" title="Ver préstamos" description="Ver estado de prestamos" icon={HandCoins} BorderColor="rgba(247, 89, 6, 0.5)" backgroundColor="rgba(247, 89, 6, 0.03)" iconColor="rgba(247, 89, 6, 0.8)"/>
                      <RedirectButton href="/dashboard" title="Ir al dashboard" description="Ver análisis financiero" icon={ChartColumnIncreasing} BorderColor="rgba(4, 87, 246, 0.5)" backgroundColor="rgba(4, 87, 246, 0.03)" iconColor="rgba(4, 87, 246, 0.8)"/>
                     
                    </div>
                    <div className="mt-0 bg-white w-full border border-gray-200 rounded-md flex flex-col justify-between gap-3 p-4 sm:mt-16 md:mt-0">
                      <h1 className="text-xl mb-1 font-semibold">Funciones adicionales</h1>

                      <RedirectButton href="/accounts/true" title="Agregar nueva cuenta" description="Crea una nueva cuenta" icon={Plus} iconColor="rgba(7, 120, 250, 0.8)" BorderColor="rgba(7, 120, 250, 0.5)" backgroundColor="rgba(7, 120, 250, 0.03)"/>
                      <RedirectButton href="/settings" title="Configuración" description="Personaliza tu experiencia" icon={Settings} iconColor="rgba(7, 120, 250, 0.8)" BorderColor="rgba(7, 120, 250, 0.5)" backgroundColor="rgba(7, 120, 250, 0.03)" />
                      <RedirectButton href="/help" title="Centro de ayuda" description="Soporte y documentación" icon={HelpCircle} iconColor="rgba(7, 120, 250, 0.8)" BorderColor="rgba(7, 120, 250, 0.5)" backgroundColor="rgba(7, 120, 250, 0.03)"/>

                    </div>
                  </div>
                  <div className="bg-white w-[calc(100% - 4px)] hidden h-[calc(100vh-292px)] md:mt-2 m-2 border border-gray-200 rounded-md sm:flex justify-between items-center p-2">
                    
                  </div>
                </div>
           </div>
        </>
    )
}