import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MainContext } from "../contexts/mainContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faTable, faUsers, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/menu.css"

export function Menu(props) {

    const navigate = useNavigate();
    const { state } = useLocation()

    const { usuario, auth, staff, superUser, setUsuario, setAuth, setStaff, setSuperUser } = useContext(MainContext)

    setUsuario(state.usuario)
    setAuth(state.auth)
    setStaff(state.permiso)
    setSuperUser(state.superUsuario)

    const handleClickDashboard = e => {
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

    const handleClickDatos = e => {
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

    const handleClickAdmin = e => {
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

    const handleClickSalir = e => {
        setAuth(false)
        navigate('/login');
    }

    if (superUser) {

        return (
            <div className="page">
                <nav className="navigationBar">
                    <p className="usuario"><img src="https://upq.occ.com.mx/Content/SiteManager/rue/xmx5upqx/images/logo.png" alt="Logo UPQ"></img>Hola {usuario}</p>
                    <div className="botones">
                        <button className="btn btn-pagina" onClick={handleClickDashboard}><FontAwesomeIcon icon={faChartLine}/><p>Dashboard</p></button>
                        <button className="btn btn-pagina" onClick={handleClickDatos}><FontAwesomeIcon icon={faTable}/><p>Datos</p></button>
                        <button className="btn btn-pagina" onClick={handleClickAdmin}><FontAwesomeIcon icon={faUsers}/><p>Admin</p></button>
                        <button className="btn btn-salir" onClick={handleClickSalir}><FontAwesomeIcon icon={faRightFromBracket}/><p>Salir</p></button>
                    </div>
                </nav>
                {props.children}
            </div>
        );

    } else if (staff) {
        return (
            <div className="page">
                <nav className="navigationBar">
                <p className="usuario"><img src="https://upq.occ.com.mx/Content/SiteManager/rue/xmx5upqx/images/logo.png" alt="Logo UPQ"></img>Hola {usuario}</p>
                    <div className="botones">
                        <button className="btn btn-pagina" onClick={handleClickDashboard}><FontAwesomeIcon icon={faChartLine}/><p>Dashboard</p></button>
                        <button className="btn btn-pagina" onClick={handleClickDatos}><FontAwesomeIcon icon={faTable}/><p>Datos</p></button>
                        <button className="btn btn-salir" onClick={handleClickSalir}><FontAwesomeIcon icon={faRightFromBracket}/><p>Salir</p></button>
                    </div>
                </nav>
                {props.children}
            </div>
        );
    }

    return (
        <div className="page">
            <nav className="navigationBar">
            <p className="usuario"><img src="https://upq.occ.com.mx/Content/SiteManager/rue/xmx5upqx/images/logo.png" alt="Logo UPQ"></img>Hola {usuario}</p>
                <div className="botones">
                    <button className="btn btn-salir" onClick={handleClickSalir}><FontAwesomeIcon icon={faRightFromBracket}/><p>Salir</p></button>
                </div>
            </nav>
            {props.children}
        </div>
    );
}