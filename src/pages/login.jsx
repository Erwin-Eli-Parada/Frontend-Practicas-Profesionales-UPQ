import React, { useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../contexts/mainContext";
import verificar from "../functions/verficar";
import { ModalRecuperar } from "../Components/modalRecuperar";
//estilos
import "../styles/login.css";

export function Login(props){
    
    const {setUsuario,setPassword, usuario, password} = useContext(MainContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleChangeUsuario = (e)=> {
        setUsuario(e.target.value);
    }

    const handleChangePassword = (e)=> {
        setPassword(e.target.value);
    }

    const handleSubmit = async(e)=> {
        // if(!auth) {
        //     alert('Usuario o contraseña incorrecta');
        // }
        e.preventDefault();
        await verificar(usuario,password, navigate)
    }

    return(
        <div className="login">
            <form className="login-container" onSubmit={handleSubmit}>
                <h1>Bienvenido al sistema de prácticas profesionales</h1>
                <input type="email" className="input" placeholder="Correo" onChange={handleChangeUsuario} required/>
                <input type="password" className="input" placeholder="Contraseña"onChange={handleChangePassword} required/>
                <input type="submit" value="Login" className="submit"/>
                <button className="btn-recuContra" onClick={()=>setShow(true)}>¿Olvidaste tu contraseña?</button>
            </form>
            <ModalRecuperar show={show} setShow={setShow}></ModalRecuperar>
        </div>
    )
}