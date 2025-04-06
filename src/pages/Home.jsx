import { useContext } from "react"
import LoginContext from "../context/LoginContext"


export default function Home(){

const {setLogin} = useContext(LoginContext)

    return(
        <div>
            <h1>HOME</h1>
            <button onClick={() => setLogin()}>Salir</button>
        </div>
    )
}