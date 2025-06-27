import {Routes, Route, Navigate } from "react-router";
import Home from "../pages/Home";
import Landing from "../pages/auth/Landing";
import Accounts from "../pages/Accounts";
import Savings from "../pages/Savings";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";
import useUser from "../hook/useUser";

export default function RoutesOfNavigation(){

const user = useUser();


const {isLogin} = useContext(LoginContext)
console.log("IS LOGIN", isLogin);

    const getRoutes = () =>{

        if (user) {
            return(
                <Routes>
                    <Route path="*" element={<Home/>} />
                    <Route path="home" element={<Home/>} />
                    <Route path="savings" element={<Savings/>} />
                    <Route path="savings/:count" element={<Savings/>} />
                    <Route path="accounts" element={<Accounts/>}/>
                    <Route path="dashboard" element={<Dashboard/>} />
                    <Route path="settings" element={<Settings/>}/>
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
