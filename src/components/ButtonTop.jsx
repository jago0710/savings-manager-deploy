import { useEffect, useState } from "react";

export default function ButtonTop() {

const [isAtTop, setIsAtTop] = useState(false);


useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.pageYOffset === 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Comprobar el estado inicial
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
},[])

const scrollTop = () => {
            window.scroll({top: 0, behavior: 'smooth'})
          }

return (
    <div hidden={isAtTop} className="fixed right-5 bottom-0 rounded-md backdrop-blur-md w-10 h-10 animate-slide-out-top md:border md:border-gray-200 flex justify-center items-center" onClick={scrollTop}>
        <span className="pi pi-arrow-up"></span>
    </div>

)    
}