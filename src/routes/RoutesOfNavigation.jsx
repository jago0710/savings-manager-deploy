import {Routes, Route } from "react-router";
import Home from "../pages/Home";
import Landing from "../pages/auth/Landing";
import Savings from "../pages/Savings";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Register from "../pages/Auth/Register";
import LoginContext from "../context/LoginContext";
import { useContext } from "react";
import Login from "../pages/Auth/Login";

export default function RoutesOfNavigation(){

const {isLogin} = useContext(LoginContext)
console.log(isLogin);

    const getRoutes = () =>{
        if (isLogin) {
            return(
                <Routes>
                    <Route path="" element={<Home/>} />
                    <Route path="movements" element={<Savings/>} />
                    <Route path="dashborad" element={<Dashboard/>} />
                    <Route path="settings" element={<Settings/>}/>
                </Routes>   
            )
        } else {
            return (
                <Routes>
                    <Route path="" element={<Landing/>} />
                    <Route path="login" element={<Login/>} />
                    <Route path="register" element={<Register/>} />
                </Routes>
            )
        }
    }

    return (
        getRoutes()
    )
}
