import Header from "../components/Header";
import Navbar from "../components/Navbar";
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
                  <div className="mt-16 md:mt-0 mx-3">
                    <h1 className="text-2xl mb-2" >Bienvenido/a a <b className="text-red-700 underline welcome">Savings Bank</b></h1>
                    <p>Gestiona tus finanzas de manera inteligente y segura con nuestra aplicación.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row w-[calc(100% - 4px)] md:mt-2 m-2 gap-2">
                    <div className="mt-0 bg-white w-full h-50 border border-gray-200 rounded-md flex justify-between p-2 ">
                      
                    </div>
                    <div className="mt-0 bg-white w-full h-50 border border-gray-200 rounded-md flex justify-between p-2 ">
                      
                    </div>
                  </div>
                  <div className="bg-white w-[calc(100% - 4px)] h-[calc(100vh-292px)] md:mt-2 m-2 border border-gray-200 rounded-md flex justify-between items-center p-2">

                  </div>
                </div>
           </div>
        </>
    )
}