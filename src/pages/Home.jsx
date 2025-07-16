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
                  <div className="mt-15 bg-gray-200 md:mt-0 w-full h-screen flex justify-center items-center">
                    <h1 className="text-3xl md:text-4xl">EN MANTENIMIENTO...</h1>
                  </div>
                </div>
           </div>
        </>
    )
}