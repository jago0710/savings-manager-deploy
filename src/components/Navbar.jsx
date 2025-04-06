import React from "react";

export default function Navbar() {
    let username = "Joel";

    const closeSession = () =>{
        /**Close sessión */
    }

    return (
        <div className="flex flex-row justify-between items-center py-7">
            <p className='text-2xl font-bold text-center' >Savings</p>
            <p className="text-center">Bienvenido {username} </p>
            <button className="p-2 rounded-lg border transition duration-300 hover:scale-110" onClick={closeSession}>Cerrar Session</button>
        </div>
    )
}