import Header from "../components/Header";
import Navbar from "../components/Navbar";
import useUser from "../hook/useUser";

export default function Settings(){

  const user = useUser();
    return(
        <>
        <div className="sm:grid md:flex">
          <Navbar page="CONFIGURACIÓN" />
          <div className="md:ml-67 bg-gray-50 w-full h-[calc(100vh-74px)]">
            <Header title="CONFIGURACIÓN"></Header>
            <div className="mt-15 bg-gray-200 md:mt-0 w-full h-screen flex">
              <div class="m-2 md:mt-2 bg-white border h-[calc(100%-65px)] md:h-[calc(100vh-89px)] w-full border-gray-200 rounded-md p-5 flex flex-col gap-3 justify-center items-center text-xl md:text-3xl text-gray-500">
                <img src={user.photoURL} alt="Perfil" height={35} width={35} />
                <p>{user.displayName}</p>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}