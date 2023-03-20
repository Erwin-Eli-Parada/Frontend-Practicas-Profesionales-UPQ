import React, { useContext } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { MainContext } from "../contexts/mainContext";



export function Menu(props){
    
    const navigate = useNavigate();
    const { state } = useLocation()

    const {usuario, auth, staff, superUser, setUsuario, setAuth, setStaff, setSuperUser} = useContext(MainContext)

    setUsuario(state.usuario)
    setAuth(state.auth)
    setStaff(state.permiso)
    setSuperUser(state.superUsuario)

    const handleClickDashboard = e =>{
        navigate('/dashboard', {
            replace: true,
            state: {
                usuario: usuario,
                auth: auth,
                permiso: staff,
                superUsuario: superUser
            }
        });
    }
    
    const handleClickDatos = e =>{
        navigate('/datos', {
            replace: true,
            state: {
                usuario: usuario,
                auth: auth,
                permiso: staff,
                superUsuario: superUser
            }
        });
    }

    const handleClickAdmin = e =>{
        navigate('/admin', {
            replace: true,
            state: {
                usuario: usuario,
                auth: auth,
                permiso: staff,
                superUsuario: superUser
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
                <p>Hola {usuario}</p>
                <button onClick={handleClickDashboard}>Dashboard</button>
                <button onClick={handleClickDatos}>Datos </button>
                <button onClick={handleClickAdmin}>admin</button>
                <button onClick={handleClickSalir}>Salir</button>
                {props.children}
            </div>
        );

    }else if(staff){
        return(
            <div>
                <p>Hola {usuario}</p>
                <button onClick={handleClickDashboard}>Dashboard</button>
                <button onClick={handleClickDatos}>Datos </button>
                <button onClick={handleClickSalir}>Salir</button>
                {props.children}
            </div>
        );
    }

    return(
        <div>
            <p>Hola {usuario}</p>
            <button onClick={handleClickSalir}>Salir</button>
            {props.children}
        </div>
    );
}