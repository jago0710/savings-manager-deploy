export default function FormCreateCard ({show}){

    return(
        <form className={show ? "animate-slide-out-left flex flex-col gap-2 top-0 -right-5 border absolute w-sm h-full bg-white border-gray-300 shadow-lg  p-5 rounded-xl" : "hidden"}>
                            <div className="flex justify-between">
                            <h2 className="text-nowrap text-xl pb-4 align-middle">Crear nueva tarjeta</h2>
                            <button className="border rounded px-4 py-1" >Cerrar</button>
                            </div>
                            <p>Para compartir un cuenta con alguien, solo tiene que enviar el número de cuenta y ellos lo podrán ingresar en su cuenta.</p>
                            <label>Nº Cuenta</label>
                            <input disabled placeholder="Nº de cuenta" min={0} maxLength={12} step={1}  required className="border border-neutral-300 rounded pl-2 py-2" type="number" value={id} onChange={(e) => {setId(e.target.value)}} />
                            <input hidden placeholder="propietarios" className="border border-neutral-300 rounded pl-2 py-2" type="text" value={"owners"} onChange={(e) => {setOwners(e.target.value)}} />
                            <label>Fecha de creación</label>
                            <input disabled placeholder="fecha de creación" className="border border-neutral-300 rounded pl-2 py-2" type="text" value={"Creación: " + new Date().toLocaleDateString()} />
                            <input hidden placeholder="moviments" type="text" value={"moviments"} onChange={() => {"setMoviments(e.target.value)"}} />
                            <button type="submit" className="bg-black text-white py-4 px-8 rounded-xl">Crear cuenta</button>
                        </form>
    )
}