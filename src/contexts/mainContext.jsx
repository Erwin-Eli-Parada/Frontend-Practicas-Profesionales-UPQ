import { createContext, useState } from "react";

export const MainContext = createContext();

export function MainContextProvider(props){
    const [usuario,setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useState(false);
    const [staff, setStaff] = useState(false);
    const [superUser, setSuperUser] = useState(false);

    return(
        <MainContext.Provider value={{usuario,setUsuario,password,setPassword,auth,setAuth,staff,setStaff,superUser,setSuperUser}}>
            {props.children}
        </MainContext.Provider>
    )
}