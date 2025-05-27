import { LoginGoogle } from "../../firebase/auth"

export default function Landing(){

    //const {setLogin} = useContext(LoginContext)

    return(
        <div className="flex flex-col h-screen px-12">
           <section id="header" className="flex items-center justify-around py-6 w-full">
                <img className="lg:h-8 h-7" src="./assets/logo.svg" alt="Logo" />
                <button onClick={LoginGoogle} className="transition duration-200 lg:hover:scale-110 border border-gray-200 bg-white rounded-2xl px-4 py-2 flex items-center gap-3">
                <img src="./landing/google-logo.png" alt="Google Logo" className="md:h-8 h-6" />
                <p className="hidden sm:block text-neutral-500">Entrar con google</p>
                </button>
           </section>
            <section id="content" className="flex lg:flex-row flex-col-reverse h-full  items-center justify-center gap-6">
                <div className="flex flex-col md:gap-6 gap-2 w-[40%]">
                    <h1 className="lg:text-6xl sm:text-3xl font-bold">
                        Empieza y ahorra con tu persona favorita
                    </h1>
                    <div className="text-gray-600 lg:text-2xl">
                        <p>¿No te gustaría tener tus ahorros controlados? 
                            En Savings Bank te ayudamos con esto, 
                            empieza a ahorrar con nosotros.
                            ¡No esperes más!</p>
                    </div>
                    <button onClick={LoginGoogle} className="bg-black text-white text-2xl py-2 px-4 rounded-lg">Comenzar</button>
                </div>
                <div>
                    <img className="md:h-auto h-90" src="./landing/cards.svg" alt="cards" />
                </div>
            </section>
        </div>
    )
}