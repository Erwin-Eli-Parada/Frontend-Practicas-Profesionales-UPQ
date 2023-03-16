import React from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "../Components/menu";

export function Dashboard(props){
    
    const { state } = useLocation()
    
    return(
        <>
            <h1 usuario="usuario" is_active={true} is_staff={true}>Dashboard</h1>
            <Menu usuario={state.usuario} is_active={state.auth} is_staff={state.permiso}/>
        </>
    )
}