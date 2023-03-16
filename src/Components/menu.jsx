import React from "react";
import { useNavigate } from "react-router-dom";



export function Menu(props){
    
    const navigate = useNavigate();
    
    const handleClickDatos = e =>{
        navigate('/datos', {
            replace: true,
            state: {
                usuario: props.usuario,
                auth: props.is_active,
                permiso: props.is_staff
            }
        });
    }

    const handleClickSalir = e =>{
        navigate('/login');
    }
    
    return(
        <div>
            <p>Hola {props.usuario}</p>
            <button>Dashboard</button>
            <button onClick={handleClickDatos}>Datos </button>
            <button>admin</button>
            <button onClick={handleClickSalir}>Salir</button>
        </div>
    );
}