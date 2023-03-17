import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "../Components/menu";
import { MainContext } from "../contexts/mainContext";

export function Dashboard(props){
    
    const { state } = useLocation()

    const {setUsuario, setAuth, setStaff, setSuperUser} = useContext(MainContext)
    
    setUsuario(state.usuario)
    setAuth(state.auth)
    setStaff(state.permiso)
    setSuperUser(state.superUsuario)

    return(
        <>
            <h1 usuario="usuario">Dashboard</h1>
            {/* <Menu usuario={state.usuario} is_active={state.auth} is_staff={state.permiso}/> */}
            <Menu />
        </>
    )
}