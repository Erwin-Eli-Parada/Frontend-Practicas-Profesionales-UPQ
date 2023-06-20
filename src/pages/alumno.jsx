import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import { Menu } from "../Components/menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot, faComment} from '@fortawesome/free-solid-svg-icons';
import { MainContext } from "../contexts/mainContext";
import { Table } from "react-bootstrap";
import "../styles/admin.css";
import "../styles/alumno.css";
import APIRoutes from '../functions/rutas'
import { ModalEncuestas } from "../Components/modalEncuestas";
import { ModalComentarios } from "../Components/modalComentarios";

export function Alumno(props) {

    const { state } = useLocation()

    const [show, setShow] = useState(false);  //Show 1 modal agregar, Show 2 modal editar, Show 3 modal historial
    const [show2, setShow2] = useState(false);
    const [usuario, setUsuario] = useState({
        "matricula": "",
        "id_practica": {
            "id": 1,
            "fecha_solicitud": "",
            "id_asesor": {
                "id_asesor": 1,
                "nombre": ""
            },
            "id_empresa": {
                "id_empresa": 1,
                "nombre_empresa": "",
                "sector": "",
                "giro": "",
                "tamanio": "",
                "correo": "",
                "telefono": ""
            },
            "id_asesor_ext": {
                "id_asesor_ext": 1,
                "encuesta": [],
                "comentario": [],
                "nombre_asesor_ext": ""
            },
            "id_practica": {
                "id_practica": 1,
                "comentarios_status": "",
                "estatus_proceso": "",
                "tipo_proceso": "",
                "carta_recibida": false,
                "avance_1": false,
                "avance_2": false,
                "reporte_final": false,
                "carta_liberacion": false
            },
            "nombre_proyecto": "",
            "metodo_conocimiento": "",
            "calificacion": "0.00",
            "comentarios_finales": ""
        },
        "correo": "",
        "correo_institucional": "",
        "generacion": 0,
        "grupo": "",
        "carrera": "",
        "nss": "",
        "genero": "",
        "nombre": ""
    });

    const contexto = useContext(MainContext)

    useEffect(() => {
        const execute = async () => {
            const usuarios = await fetch(APIRoutes.infoAlumno+state.correo+"/")
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setUsuario(usuarios)
            console.log(usuarios)
        };
        execute();
    }, []);

    const listItemsAlumno = [
        <tr>
            <td>Numero de seguro social</td>
            <td>{usuario.nss}</td>
        </tr>,
        <tr>
            <td>Correo</td>
            <td>{usuario.correo}</td>
        </tr>,
        <tr>
            <td>Correo institucional</td>
            <td>{usuario.correo_institucional}</td>
        </tr>,
        <tr>
            <td>Genero</td>
            <td>{usuario.genero}</td>
        </tr>,
        <tr>
            <td>Grupo</td>
            <td>{usuario.grupo}</td>
        </tr>,
        <tr>
            <td>Generación</td>
            <td>{usuario.generacion}</td>
        </tr>
    ];

    const listItemsPractica = [
        <tr>
            <td>Nombre del proyecto</td>
            <td>{usuario.id_practica.nombre_proyecto==="nan" ? "Sin asignar" : usuario.id_practica.nombre_proyecto}</td>
        </tr>,
        <tr>
            <td>Tipo de proceso</td>
            <td>{usuario.id_practica.id_practica.tipo_proceso==="nan" ? "Sin asignar" : usuario.id_practica.id_practica.tipo_proceso}</td>
        </tr>,
        <tr>
            <td>Estatus del proceso</td>
            <td>{usuario.id_practica.id_practica.estatus_proceso==="nan" ? "Sin asignar" : usuario.id_practica.id_practica.estatus_proceso}</td>
        </tr>,
        <tr>
            <td>Asesor UPQ</td>
            <td>{usuario.id_practica.id_asesor_ext.nombre_asesor_ext}</td>
        </tr>,
        <tr>
            <td>Fecha de solicitud</td>
            <td>{usuario.id_practica.fecha_solicitud}</td>
        </tr>,
        <tr>
            <td>Método de conocimiento</td>
            <td>{usuario.id_practica.metodo_conocimiento==="nan" ? "Sin asignar" : usuario.id_practica.metodo_conocimiento}</td>
        </tr>,
        <tr>
            <td>Calificación final</td>
            <td>{usuario.id_practica.calificacion}</td>
        </tr>,
        <tr>
            <td>Carta de liberación</td>
            <td>{usuario.id_practica.id_practica.carta_liberacion===false ? "No" : "Si"}</td>
        </tr>
    ];

    const listItemsEmpresa = [
        <tr>
            <td>Empresa</td>
            <td>{usuario.id_practica.id_empresa.nombre_empresa}</td>
        </tr>,
        <tr>
            <td>Sector</td>
            <td>{usuario.id_practica.id_empresa.sector===""?"Ninguo":usuario.id_practica.id_empresa.sector}</td>
        </tr>,
        <tr>
            <td>Giro</td>
            <td>{usuario.id_practica.id_empresa.giro===""?"Ninguo":usuario.id_practica.id_empresa.giro}</td>
        </tr>,
        <tr>
            <td>Asesor de la empresa</td>
            <td>{usuario.id_practica.id_asesor_ext.nombre_asesor_ext}</td>
        </tr>,
        <tr>
            <td>Correo de la empresa</td>
            <td>{usuario.id_practica.id_empresa.correo===""?"Ninguo":usuario.id_practica.id_empresa.correo}</td>
        </tr>,
        <tr>
            <td>Telefono de la empresa</td>
            <td>{usuario.id_practica.id_empresa.telefono===""?"Ninguo":usuario.id_practica.id_empresa.telefono}</td>
        </tr>
    ];

    //metodos On

    const mostrar = e => {
        setShow(true)
    }

    const mostrar2 = e => {
        setShow2(true)
    }

    return (
        <div className="principal">
            <h1 className="tituloPagina">Información del estudiante</h1>
            
                <h3 className="alumno">{usuario.nombre}</h3>
            
            <h4 className="alumno">Matricula: {usuario.matricula}</h4>

            <div className="divisor">Información del alumno</div>
            
            <Table striped bordered hover responsive className="tablaUsuarios">
                <tbody className="tablaUsuarios-body">
                    {listItemsAlumno}
                </tbody>
            </Table>

            <div className="divisor">Información de la práctica profesional</div>

            <Table striped bordered hover responsive className="tablaUsuarios">
                <tbody className="tablaUsuarios-body">
                    {listItemsPractica}
                </tbody>
            </Table>

            <div className="divisor">Información de la empresa</div>

            <Table striped bordered hover responsive className="tablaUsuarios">
                <tbody className="tablaUsuarios-body">
                    {listItemsEmpresa}
                </tbody>
            </Table>

            <div className="fila-botones-alumnos">
                <button className="editarAlumno" onClick={e => {setShow(true) }}>
                    <FontAwesomeIcon icon={faCheckToSlot}/> Ver encuestas del asesor
                </button>
                <button className="editarAlumno" onClick={e => {setShow2(true) }}>
                    <FontAwesomeIcon icon={faComment}/> Ver comentarios del asesor
                </button>
            </div>
            <ModalEncuestas show={show} setShow={setShow} alumno={usuario.matricula===""?"016020874":usuario.matricula} />
            <ModalComentarios show={show2} setShow={setShow2} alumno={usuario.matricula===""?"016020874":usuario.matricula} />
        </div>
    )
}