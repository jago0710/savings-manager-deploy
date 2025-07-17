import Header from "../components/Header";
import Navbar from "../components/Navbar"
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
                  <div className="mt-18 bg-white w-[calc(100% - 4px)] md:mt-2 m-2 h-screen border border-gray-200 rounded-md flex justify-center items-center">
                    <h1 className="text-3xl md:text-4xl">EN MANTENIMIENTO...</h1>
                  </div>
                </div>
           </div>
        </>
    )
}