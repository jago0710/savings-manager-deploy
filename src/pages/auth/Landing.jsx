import { useContext } from "react"
import LoginContext from "../../context/LoginContext"

export default function Landing(){

    const {setLogin} = useContext(LoginContext)

    return(
        <div>
            <h1>LANDING</h1>
            <button onClick={() => setLogin()}>Entrar</button>
        </div>
    )
}