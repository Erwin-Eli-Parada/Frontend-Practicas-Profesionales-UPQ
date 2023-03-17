import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/mainContext";



export function Menu(props){
    
    const navigate = useNavigate();
    
    const {usuario, auth, staff, superUser, setAuth} = useContext(MainContext)

    const handleClickDashboard = e =>{
        navigate('/dashboard', {
            replace: true,
            state: {
                usuario: usuario,
                auth: auth,
                permiso: staff
            }
        });
    }
    
    const handleClickDatos = e =>{
        navigate('/datos', {
            replace: true,
            state: {
                usuario: usuario,
                auth: auth,
                permiso: staff
            }
        });
    }

    const handleClickAdmin = e =>{
        navigate('/admin', {
            replace: true,
            state: {
                usuario: usuario,
                auth: auth,
                permiso: staff
            }
        });
    }

    const handleClickSalir = e =>{
        setAuth(false)
        navigate('/login');
    }
    
    if(superUser){

        return(
            <div>
                <p>Hola {props.usuario}</p>
                <button onClick={handleClickDashboard}>Dashboard</button>
                <button onClick={handleClickDatos}>Datos </button>
                <button onClick={handleClickAdmin}>admin</button>
                <button onClick={handleClickSalir}>Salir</button>
            </div>
        );

    }else if(staff){
        return(
            <div>
                <p>Hola {props.usuario}</p>
                <button onClick={handleClickDashboard}>Dashboard</button>
                <button onClick={handleClickDatos}>Datos </button>
                <button onClick={handleClickSalir}>Salir</button>
            </div>
        );
    }

    return(
        <div>
            <p>Hola {props.usuario}</p>
            <button onClick={handleClickDatos}>Datos </button>
            <button onClick={handleClickSalir}>Salir</button>
        </div>
    );
}