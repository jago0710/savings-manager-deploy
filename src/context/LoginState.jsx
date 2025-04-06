import { useState } from "react";
import LoginContext from "./LoginContext";

const LoginState = (props) => {
    const [isLogin, setIsLogin] = useState(false);

    const getLogin = () => {return(isLogin)}

    const setLogin = () => {setIsLogin(!isLogin)}

    
    return(
        <LoginContext.Provider value={{
            isLogin : isLogin,
            dispatch: setIsLogin,
            getLogin: getLogin,
            setLogin: setLogin,
        }}>
            {props.children}
        </LoginContext.Provider>
    )


    
}

export default LoginState;