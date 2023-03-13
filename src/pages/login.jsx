import React, { useState } from "react";
//estilos
import "./login.css";

export function Login(props){
    
    const [usuario,setUsuario] = useState("");
    const [password,setPassword] = useState("");

    const handleChangeUsuario = (e)=> {
        setUsuario(e.target.value);
        console.log(usuario)
    }

    const handleChangePassword = (e)=> {
        setPassword(e.target.value);
    }

    const handleSubmit = (e)=> {
        alert('A name was submitted: ' + usuario);
        console.log(usuario,password)
        e.preventDefault();
    }

    return(
        <div className="login">
            <form className="login-container" onSubmit={handleSubmit}>
                <h1>Bienvenido al sistema de prácticas profesionales</h1>
                <input type="text" className="input" placeholder="nombre de usuario" onChange={handleChangeUsuario} required/>
                <input type="password" className="input" placeholder="contraseña"onChange={handleChangePassword} required/>
                <input type="submit" value="Login" className="submit"/>
            </form>
        </div>
    )
}