import { useState } from "react";
import { Home, Settings, Menu, LayoutDashboard, LogOut, WalletCardsIcon, HandCoins} from "lucide-react";
import closeSession from "./CloseSession";
import useUser from "../hook/useUser";
import { Chip } from "primereact/chip";
import { Skeleton } from "primereact/skeleton";
import { href } from "react-router";


export default function Navbar({page}) {
  const [open, setOpen] = useState(false);
  const currentPath = window.location.pathname;
  const user = useUser();
  
  const routes = [
    { href: "/home", label: "Inicio", icon: Home },
    { href: "/accounts", label: "Cuentas", icon: WalletCardsIcon},
    { href: "/loans", label: "Prestamos", icon: HandCoins},
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/settings", label: "Configuración", icon: Settings },
    { href: "/home", label: "Cerrar cuenta", icon: LogOut },
  ];


  return (
    <>
      {/* Mobile top bar */}
      <div className={!open ? 'md:hidden h-16 p-3 flex justify-between items-center backdrop-blur-md backdrop-brightness-97 fixed z-2 w-full' : 'animate-slide-in-right md:hidden h-16 p-3 flex bg-white justify-between items-center border-b border-b-gray-200 fixed z-2 w-full'}>
        {
          page && !open
          ? <p className="text-xl font-bold "><b className="text-red-700">/ </b>{page}</p>
          : <p className="text-xl font-bold "><b className="text-red-700">/ </b>SAVINGS BANK</p>
        }
        <button onClick={() => setOpen(!open)} className="p-2 rounded-lg ">
          <Menu className="h-7 w-7" />
        </button>
      </div>

      <div className="flex md:min-h-screen">
        {/* Sidebar */}
        <div
          className={`${
            open ? "animate-slide-in-right block" : "hidden"
          } md:block h-screen w-full md:w-67 bg-white border-r border-r-neutral-300 p-4 z-1 fixed`}
        >
            <div className="mb-4 flex flex-col gap-2  mt-15 md:mt-0">
                <h1 className="hidden md:block ml-2 text-2xl font-bold mb-2"><b className="text-red-700">/ </b>SAVINGS BANK</h1>
                {user.displayName && user.photoURL
                ? <Chip label={user.displayName} image={user.photoURL} imageAlt="Foto perfil" /> 
                : <Skeleton height="2rem" borderRadius="16px"></Skeleton>}
            </div>
          <nav className="flex flex-col gap-3">
            {routes.map(({ href, label, icon : Icon }, index) => (
              <a
                key={index}
                href={label === "Cerrar cuenta" ? "" : href}
                onClick={label === "Cerrar cuenta" ? () => closeSession() : () => setOpen(false)}
                className={`flex items-center gap-3 pl-3 py-2 rounded-md transition duration-200 hover:scale-105 hover:text-gray-700 select-none ${
                  currentPath === href
                    ? "bg-neutral-100 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5"/>
                {label}
              </a>
            ))}
           
          </nav>
        </div>
      </div>
    </>
  );
}
