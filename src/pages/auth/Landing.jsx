import { LoginGoogle } from "../../firebase/auth"


export default function Landing(){

    //const {setLogin} = useContext(LoginContext)

    return(
        <div className="flex flex-col h-screen">
           <section id="header" className="flex items-center justify-between pt-6 px-6 w-full">
                <img className="lg:h-8 h-7" src="./assets/logo.svg" alt="Logo" />
                <button onClick={LoginGoogle} 
                className="transition duration-200 lg:hover:scale-110 border border-gray-200 bg-white rounded-2xl px-4 py-2 flex items-center gap-3">
                <img src="./landing/google-logo.png" alt="Google Logo" className="md:h-8 h-6" />
                {screen.width < 640
                ? <p className=" text-neutral-500">Entrar</p>
                : <p className=" text-neutral-500 sm">Entrar con google</p>} 
                </button>
           </section>
            <section id="content" className="flex lg:flex-row flex-col-reverse h-full  items-center justify-end md:justify-center gap-6">
                <div className="flex flex-col md:gap-6 gap-8 w-[90%] md:w-[40%]">
                    <h1 className="lg:text-6xl text-3xl font-bold">
                        Empieza y ten tus cuentas controladas
                    </h1>
                    <p className="text-[#2566af] text-3xl font-bold">¿Que ofrecemos?</p>
                    <div className="text-gray-600 lg:text-2xl">
                        <ul>
                            <li>Registro de movimientos <i className="pi pi-check" style={{color: 'green', fontSize: '1rem'}}></i></li>
                            <li>Multicuentas <i className="pi pi-check" style={{color: 'green', fontSize: '1rem'}}></i></li>
                            <li>Cuentas compartidas <i className="pi pi-check" style={{color: 'green', fontSize: '1rem'}}></i></li>
                            <li>Personalización de tarjetas <i className="pi pi-check" style={{color: 'green', fontSize: '1rem'}}></i></li>
                            <li>Gráficos del estado de tu cuenta <i className="pi pi-check" style={{color: 'green', fontSize: '1rem'}}></i></li>
                        </ul>
                    </div>
                    <button onClick={LoginGoogle} className="bg-black text-white text-2xl py-2 px-4 rounded-lg">Comenzar</button>
                </div>
                <div>
                    <img className="md:h-96 lg:h-auto h-80" src="./landing/cards.svg" alt="cards" />
                </div>
            </section>
        </div>
    )
}