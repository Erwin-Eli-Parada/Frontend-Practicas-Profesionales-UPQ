import { createContext, useState } from "react";

export const MainContext = createContext();

export function MainContextProvider(props){
    const [usuario,setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(false);
    const [staff, setStaff] = useState(false);
    const [superUser, setSuperUser] = useState(false);
    const [correo, setCorreo] = useState("");

    return(
        <MainContext.Provider value={{usuario,setUsuario,password,setPassword,auth,setAuth,staff,setStaff,superUser,setSuperUser,correo, setCorreo}}>
            {props.children}
        </MainContext.Provider>
    )
}