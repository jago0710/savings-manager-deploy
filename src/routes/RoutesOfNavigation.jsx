import {Routes, Route } from "react-router";
import Home from "../pages/Home";
import Landing from "../pages/auth/Landing";
import Accounts from "../pages/Accounts";
import Savings from "../pages/Savings";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";
import useUser from "../hook/useUser";
import Loans from "../pages/Loans";
import { LogIn } from "lucide-react";
import Help from "../pages/Help";

export default function RoutesOfNavigation(){

const user = useUser();


const {isLogin} = useContext(LoginContext)
if (isLogin) {
    console.log("LOGUEADO...");
}

    const getRoutes = () =>{

        if (user) {
            return(
                <Routes>
                    <Route path="*" element={<Home/>} />
                    <Route path="home" element={<Home/>} />
                    <Route path="savings" element={<Savings/>} />
                    <Route path="savings/:count" element={<Savings/>} />
                    <Route path="accounts" element={<Accounts/>}/>
                    <Route path="accounts/:newCard" element={<Accounts/>}/>
                    <Route path="loans" element={<Loans/>}/>
                    <Route path="loans/:numberAccount" element={<Loans/>}/>
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="dashboard/:numberAccount" element={<Dashboard/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="help" element={<Help/>}/>
                </Routes>  
            )
        } else {
            return (
                <Routes>
                    <Route path="*" element={<Landing/>} />
                </Routes>
            )
        }
    }

    return (
        getRoutes()
    )
}
