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
                  <div className="mt-18 md:mt-2 mx-2 rounded-md bg-white w-[calc(100% - 4px)] border border-gray-200 p-2">
                    <p className="text-2xl" >Bienvenido a <b className="text-red-700 welcome"><a href="/home"><span className="mr-0.5">/</span>Savings Bank</a></b></p>
                  </div>
                  <div className="flex flex-col sm:flex-row w-[calc(100% - 4px)] md:mt-2 m-2 gap-2">
                    <div className="mt-0 bg-white w-full h-50 border border-gray-200 rounded-md flex justify-between p-2 ">
                      {/** COMPONENTE */}
                      <div className="border h-15 w-full rounded-md border-gray-100 hover:bg-blue-100 flex flex-row hover:cursor-crosshair">
                        <div className="p-2 w-15 flex justify-center items-center">
                          icon
                        </div>
                        <div className="flex flex-col justify-center">
                          <h1>Title</h1>
                          <p>Description card</p>
                        </div>
                      </div>
                      {/** FIN DE COMPONENTE */}
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