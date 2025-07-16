import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Settings(){
    return(
        <>
        <div className="sm:grid md:flex">
          <Navbar page="CONFIGURACIÓN" />
          <div className="md:ml-67 bg-gray-50 w-full h-[calc(100vh-74px)]">
            <Header title="CONFIGURACIÓN"></Header>
            <div className="mt-15 bg-gray-200 md:mt-0 w-full h-screen flex justify-center items-center">
              <h1 className="text-3xl md:text-4xl">EN MANTENIMIENTO...</h1>
            </div>
          </div>
        </div>
      </>
    )
}