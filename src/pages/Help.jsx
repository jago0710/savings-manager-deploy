import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PresentationCards from "../components/PresentationCards";

export default function Help() {
    
    
    return(
        <>
            <div className="sm:grid md:flex">
                <Navbar page="AYUDA"/>
                <div className="md:ml-67 bg-gray-50 w-full h-[calc(100vh-74px)]">
                    <Header title="AYUDA"></Header>
                    <div className="mt-18 bg-white w-[calc(100% - 4px)] md:mt-2 m-2 border border-gray-200 rounded-md flex justify-center items-center p-2">
                        <PresentationCards></PresentationCards>
                    </div>
                </div>
            </div>
        </>
    )
}