import React from "react";
//estilos
import "./login.css";

export function Login(props){
    return(
        <div className="login">
            <form className="login-container">
                <h1>Bienvenido al sistema de prácticas profesionales</h1>
                <input type="text" className="username" placeholder="nombre de usuario"/>
                <input type="password" className="password" placeholder="contraseña"/>
                <input type="submit" value="Login" className="submit"/>
            </form>
        </div>
    )
}