import React, { useState } from "react";
import { Home, Wallet, CreditCard, Settings, Menu, LayoutDashboard, LogOut } from "lucide-react";
import closeSession from "./CloseSession";
import useUser from "../hook/useUser";
import { Chip } from "primereact/chip";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const currentPath = window.location.pathname;
  const user = useUser();

  const routes = [
    { href: "/home", label: "Inicio", icon: Home },
    { href: "/accounts", label: "Cuentas", icon: Wallet },
    { href: "/dashborad", label: "Dashboard", icon: LayoutDashboard },
    { href: "/settings", label: "Configuración", icon: Settings },
    { label: "Cerrar cuenta", icon: LogOut },
  ];


  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden h-16 p-4 flex justify-between items-center bg-white border-b">
        <p className="text-xl font-bold ">/SAVINGS BANK</p>
        <button onClick={() => setOpen(!open)} className="p-2 rounded-lg ">
          <Menu className="h-7 w-7" />
        </button>
      </div>

      <div className="flex md:min-h-screen">
        {/* Sidebar */}
        <div
          className={`${
            open ? "block" : "hidden"
          } md:block h-screen w-full md:w-68 bg-white border-r border-r-neutral-300 p-4  md:static`}
        >
            <div className="mb-4 flex flex-col gap-2">
                <h1 className="hidden md:block ml-2 text-2xl font-bold mb-2">/SAVINGS BANK</h1>
                <Chip label={user.displayName} image={user.photoURL}/>
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
