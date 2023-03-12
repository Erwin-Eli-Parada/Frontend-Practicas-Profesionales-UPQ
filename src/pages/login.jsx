import React from "react";

export function Login(props){
    return(
        <div className="main-container">
            <form className="login-container">
                <h1>Bienvenido al sistema de practicas profesionales</h1>
                <input type="text" className="username" placeholder="nombre de usuario"/>
                <input type="password" className="password" placeholder="contraseña"/>
                <input type="submit" value="Login" className="submit"/>
            </form>
        </div>
    )
}