import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { Table, Form } from "react-bootstrap";
import { ModalAgregarArchivo } from '../Components/modalAgregarArchivo';
import "../styles/datos.css";
import { ModalEncuestas } from "../Components/modalEncuestas";

export function Datos(props) {
    const [datos, setDatos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [total, setTotal] = useState(0);

    const [search, setSearch] = useState('');
    const [filtrado, setFiltrado] = useState([]);
    const [tipo, setTipo] = useState("Todos");
    const [estatus, setEstatus] = useState("Todos");
    const [carrera, setCarrera] = useState("Todos");
    const [genero, setGenero] = useState("Todos");
    const [giro, setGiro] = useState("Todos");
    const [tamanio, setTamanio] = useState("Todos");
    const [generacion, setGeneracion] = useState(0);

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [alumno, setAlumno] = useState("1");

    // const contexto = useContext(MainContext);

    const numero_tabla = 10;

    useEffect(() => {
        const execute = async () => {
            const datos = await fetch('http://127.0.0.1:8000/datos/alumno/')
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            console.log(datos)
            setDatos(datos)
            setFiltrado(datos.slice(currentPage, currentPage + numero_tabla))
            setTotal(datos.length)
        };
        execute();
    }, []);

    //efecto para el filtrado
    useEffect(() => {
        usuarioFiltrado()
    }, [currentPage, search, tipo, estatus, carrera, genero, generacion, giro, tamanio]);

    //función del filtrado por busqueda
    const usuarioFiltrado = () => {
        let filtrados = [...datos]
        if (carrera !== "Todos" || estatus !== "Todos" || tipo !== "Todos" || genero !== "Todos" || generacion != 0 || giro !== "Todos" || tamanio !== "Todos") {

            if (tipo !== "Todos")
                filtrados = filtrados.filter(element =>
                    element.id_practica.id_practica.tipo_proceso.toLowerCase()===tipo.toLowerCase()
                );
            if (estatus !== "Todos")
                filtrados = filtrados.filter(element =>
                    element.id_practica.id_practica.estatus_proceso.toLowerCase().includes(estatus.toLowerCase())
                );
            if (carrera !== "Todos")
                filtrados = filtrados.filter(element =>
                    element.carrera.toLowerCase() === carrera.toLowerCase()
                );
            if (genero !== "Todos")
                filtrados = filtrados.filter(element =>
                    element.genero.toLowerCase().includes(genero.toLowerCase())
                );
            if (generacion != 0)
                filtrados = filtrados.filter(element =>
                    element.generacion == generacion
                );
            if (giro !== "Todos")
                filtrados = filtrados.filter(element =>
                    element.id_practica.id_empresa.giro.toLowerCase().includes(giro.toLowerCase())
                );
            if (tamanio !== "Todos")
                filtrados = filtrados.filter(element =>
                    element.id_practica.id_empresa.tamanio.toLowerCase() === tamanio.toLowerCase()
                );
        }

        if (search.length === 0) {
            setTotal(filtrados.length)
            return setFiltrado(filtrados.slice(currentPage, currentPage + numero_tabla));
        }

        filtrados = filtrados.filter(element =>
            element.nombre.toLowerCase().includes(search.toLowerCase()) ||
            element.correo.toLowerCase().includes(search.toLowerCase()) ||
            element.grupo.toLowerCase().includes(search.toLowerCase()) ||
            element.correo_institucional.toLowerCase().includes(search.toLowerCase()) ||
            element.id_practica.id_empresa.nombre_empresa.includes(search) ||
            element.id_practica.nombre_proyecto.toLowerCase().includes(search) ||
            element.id_practica.id_asesor.nombre.toLowerCase().includes(search) ||
            element.id_practica.id_asesor_ext.nombre_asesor_ext.toLowerCase().includes(search)
        );

        setTotal(filtrados.length)
        return setFiltrado(filtrados.slice(currentPage, currentPage + numero_tabla));
    }

    console.log("usuario filtrado", filtrado.length)
    console.log("Pagina actual", currentPage)
    console.log("busqueda", search.length)

    const listItems = filtrado.map(element =>
        <tr key={element.matricula}>
            <td>{element.id_practica.id_practica.id_practica}</td>
            <td>{element.id_practica.id_practica.tipo_proceso}</td>
            <td>{element.id_practica.id_practica.estatus_proceso}</td>
            <td>{element.id_practica.id_practica.comentarios_status === "nan" ? "" : element.id_practica.id_practica.comentarios_status}</td>
            <td>{element.id_practica.id_practica.carta_recibida ? "Si" : "No"}</td>
            <td>{element.matricula}</td>
            <td>{element.nombre}</td>
            <td>{element.nss}</td>
            <td>{element.carrera}</td>
            <td>{element.grupo}</td>
            <td>{element.genero}</td>
            <td>{element.generacion}</td>
            <td>{element.correo}</td>
            <td>{element.correo_institucional}</td>
            <td>{element.id_practica.fecha_solicitud}</td>
            <td>{element.id_practica.metodo_conocimiento === "nan" ? "" : element.id_practica.metodo_conocimiento}</td>
            <td>{element.id_practica.id_empresa.nombre_empresa}</td>
            <td>{element.id_practica.id_empresa.sector}</td>
            <td>{element.id_practica.id_empresa.giro}</td>
            <td>{element.id_practica.id_empresa.tamanio}</td>
            <td>{element.id_practica.nombre_proyecto === "nan" ? "" : element.id_practica.nombre_proyecto}</td>
            <td>{element.id_practica.id_asesor.nombre}</td>
            <td>{element.id_practica.id_asesor_ext.nombre_asesor_ext}</td>
            <td>{element.id_practica.calificacion === "0.00" ? "" : element.id_practica.calificacion}</td>
            <td>{element.id_practica.comentarios_finales === "nan" ? "" : element.id_practica.comentarios_finales}</td>
            <td>{element.id_practica.id_practica.carta_liberacion ? "Si" : "No"}</td>
            <td>{element.id_practica.id_practica.reporte_final ? "Si" : "No"}</td>
            <td>{element.id_practica.id_practica.id_practica.avance_1 ? "Si" : "No"}</td>
            <td>{element.id_practica.id_practica.id_practica.avance_2 ? "Si" : "No"}</td>
            <td>{element.id_practica.id_empresa.correo}</td>
            <td>{element.id_practica.id_empresa.telefono}</td>
            <td className="botonEditar">
                <button className="editar" onClick={e => { setAlumno(element.matricula); setShow2(true) }}><FontAwesomeIcon icon={faCheckToSlot} /></button>
            </td>
        </tr>
    );

    const handleChangeSearch = e => {
        setCurrentPage(0);
        setSearch(e.target.value);
    }

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            usuarioFiltrado();
        }
    }

    const nextPage = e => {
        if (total >= currentPage + numero_tabla)
            setCurrentPage(currentPage + numero_tabla);
    }

    const prevPage = e => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - numero_tabla);
        }
    }

    const mostrar = e => {
        setShow(true)
    }

    return (
        <div className="principal">
            <h1 className="tituloPagina">Datos de las residencias</h1>
            <div className="cabecera-wrapper">
                <div className="search2">
                    <input type="text" className="search2-input" placeholder="search" onChange={handleChangeSearch} onKeyDown={handleKeyDown}></input>
                    <button className="busqueda" onClick={usuarioFiltrado}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
                <div className="filtros">
                    <div>
                        <label for="tipoSelect">Tipo de proceso:</label>
                        <select className='selector' name="tipoSelect" defaultValue="Todos" onChange={e => { setTipo(e.target.value) }}>
                            <option value={"Todos"}>Todos</option>
                            <option value={"Estadia"}>Estadia</option>
                            <option value={"Estancia I"}>Estancia I</option>
                            <option value={"Estancia II"}>Estancia II</option>
                        </select>
                    </div>
                    <div>
                        <label for="estatusSelect">Estatus del proceso de proceso:</label>
                        <select className='selector' name="estatusSelect" defaultValue="Todos" onChange={e => { setEstatus(e.target.value) }}>
                            <option value={"Todos"}>Todos</option>
                            <option value={"Autorizado"}>Autorizado</option>
                            <option value={"Concluido"}>Concluido</option>
                            <option value={"Corregir información"}>Corregir información</option>
                            <option value={"Rechazado"}>Rechazado</option>
                            <option value={"Reprobado"}>Reprobado</option>
                            <option value={"Solicitud"}>Solicitud</option>
                        </select>
                    </div>
                    <div>
                        <label for="carreraSelect">Carrera:</label>
                        <select className='selector' name="carreraSelect" defaultValue="Todos" onChange={e => { setCarrera(e.target.value) }}>
                            <option value={"Todos"}>Todos</option>
                            <option value={"Automotriz"}>Automotriz</option>
                            <option value={"Manufactura"}>Manufactura</option>
                            <option value={"Mecatronica"}>Mecatronica</option>
                            <option value={"Negocios"}>Negocios</option>
                            <option value={"Pymes"}>PYMES</option>
                            <option value={"Pymes ejecutiva"}>PYMES Ejecutiva</option>
                            <option value={"Sistemas"}>Sistemas</option>
                            <option value={"Telematica"}>Telematica</option>
                        </select>
                    </div>
                    <div>
                        <label for="generoSelect">Genero:</label>
                        <select className='selector' name="generoSelect" defaultValue="Todos" onChange={e => { setGenero(e.target.value) }}>
                            <option value={"Todos"}>Todos</option>
                            <option value={"Masculino"}>Masculino</option>
                            <option value={"Femenino"}>Femenino</option>
                        </select>
                    </div>
                    <Form.Group controlId="numberPicker" style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                        <Form.Label>Generación:</Form.Label>
                        <Form.Control
                            type="number"
                            style={{ width: "70px" }}
                            min={0}
                            value={generacion}
                            onChange={e => { setGeneracion(e.target.value) }}
                        />
                    </Form.Group>
                    <div>
                        <label for="giroSelect">Giro de la empresa:</label>
                        <select className='selector' name="giroSelect" defaultValue="Todos" onChange={e => { setGiro(e.target.value) }}>
                            <option value={"Todos"}>Todos</option>
                            <option value={"investigacion"}>Investigación</option>
                            <option value={"privada"}>Privada</option>
                            <option value={"publica"}>Pública</option>
                            <option value={"social"}>Social</option>
                        </select>
                    </div>
                    <div>
                        <label for="tamanioSelect">Tamaño de la empresa:</label>
                        <select className='selector' name="tamanioSelect" defaultValue="Todos" onChange={e => { setTamanio(e.target.value) }}>
                            <option value={"Todos"}>Todos</option>
                            <option value={"G"}>G</option>
                            <option value={"M"}>M</option>
                            <option value={"MC"}>MC</option>
                            <option value={"P"}>P</option>
                        </select>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                    <button className="agregar" onClick={mostrar}><FontAwesomeIcon icon={faPlus} /><p>Agregar</p></button>
                </div>
            </div>
            <div className="paginacion">
                <button className="paginacion-btn" onClick={prevPage}>Anterior</button>
                <span className="paginacion-text">Registros del {currentPage + 1} al {currentPage + numero_tabla} de {total}</span>
                <button className="paginacion-btn" onClick={nextPage}>Siguiente</button>
            </div>
            <Table striped bordered hover responsive className="tablaUsuarios">
                <thead className="tablaUsuarios-head">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Tipo proceso</th>
                        <th scope="col">Estatus del proceso</th>
                        <th scope="col">Comentarios del estatus</th>
                        <th scope="col">Recibio carta</th>
                        <th scope="col">Matricula</th>
                        <th scope="col">Alumno</th>
                        <th scope="col">NSS</th>
                        <th scope="col">Carrera</th>
                        <th scope="col">Grupo</th>
                        <th scope="col">Genero</th>
                        <th scope="col">Generación</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Correo Institucional</th>
                        <th scope="col">Fecha de solicitud</th>
                        <th scope="col">Metodo de conocimiento</th>
                        <th scope="col">Empresa</th>
                        <th scope="col">Sector</th>
                        <th scope="col">Giro</th>
                        <th scope="col">Tamaño</th>
                        <th scope="col">Proyecto</th>
                        <th scope="col">Asesor UPQ</th>
                        <th scope="col">Asesor empresa</th>
                        <th scope="col">Calificacion final</th>
                        <th scope="col">Comentarios finales</th>
                        <th scope="col">Carta liberación</th>
                        <th scope="col">Reporte final</th>
                        <th scope="col">Avance 1</th>
                        <th scope="col">Avance 2</th>
                        <th scope="col">Correo RH Empresa</th>
                        <th scope="col">Telefono RH Empresa</th>
                        <th scope="col">Encuesta</th>
                    </tr>
                </thead>
                <tbody className="tablaUsuarios-body">
                    {listItems}
                </tbody>
            </Table>
            <ModalAgregarArchivo show={show} setShow={setShow} />
            <ModalEncuestas show={show2} setShow={setShow2} alumno={alumno} />
        </div>
    )
}