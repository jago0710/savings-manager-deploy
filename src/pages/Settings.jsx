import Navbar from "../components/Navbar";

export default function Settings(){
    return(
        <>
        <div className="sm:grid md:flex">
          <Navbar page="CONFIGURACIÓN" />
          <div className="mt-15 bg-gray-200 md:mt-0 w-full h-screen flex justify-center items-center">
            <h1 className="text-3xl md:text-4xl">EN MANTENIMIENTO...</h1>
          </div>
        </div>
      </>
    )
}