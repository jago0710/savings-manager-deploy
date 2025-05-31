import closeSession from "../components/CloseSession"
import Navbar from "../components/Navbar"
import useUser from "../hook/useUser"

export default function Home(){
const user = useUser();
console.log("=>=>=>=> ",user);

    return(
        <>
           <div className="sm:grid md:flex">
                <Navbar/>
                <div className="bg-neutral-200 b-1 w-full">
                    <h1>Bienvenid@ {user.displayName}</h1>
                    <button onClick={closeSession}>Salir</button> <br />
                    <a href="savings">ir a Savings</a>
                </div>
           </div>
        </>
    )
}