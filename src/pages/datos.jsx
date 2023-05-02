import React, { useEffect, useState } from "react";
// import { MainContext } from "../contexts/mainContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Table } from "react-bootstrap";
import "../styles/admin.css";

export function Datos(props){
    const [datos, setDatos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const [filtrado, setFiltrado] = useState([]);
    const [show, setShow] = useState(false);

    // const contexto = useContext(MainContext);

    const numero_tabla = 9;

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
        };
        execute();
    }, []);

    useEffect(() => {
        usuarioFiltrado()
    }, [currentPage]);

    useEffect(() => {
        usuarioFiltrado()
    }, [search]);

    const usuarioFiltrado = () => {
        if (search.length === 0)
            return setFiltrado(datos.slice(currentPage, currentPage + numero_tabla));
        
        const filtrados = datos.filter(element => 
            element.nombre.includes(search)
        );

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
            <td>{element.id_practica.id_practica.comentarios_status}</td>
            <td>{element.id_practica.id_practica.carta_recibida?"Si":"No"}</td>
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
            <td>{element.id_practica.metodo_conocimiento}</td>
            <td>{element.id_practica.id_empresa.nombre_empresa}</td>
            <td>{element.id_practica.id_empresa.sector}</td>
            <td>{element.id_practica.id_empresa.giro}</td>
            <td>{element.id_practica.id_empresa.tamanio}</td>
            <td>{element.id_practica.nombre_proyecto}</td>
            <td>{element.id_practica.id_asesor.nombre}</td>
            <td>{element.id_practica.id_asesor_ext.nombre_asesor_ext}</td>
            <td>{element.id_practica.calificacion}</td>
            <td>{element.id_practica.comentarios_finales}</td>
            <td>{element.id_practica.id_practica.carta_liberacion?"Si":"No"}</td>
            <td>{element.id_practica.id_practica.reporte_final?"Si":"No"}</td>
            <td>{element.id_practica.id_practica.id_practica.avance_1?"Si":"No"}</td>
            <td>{element.id_practica.id_practica.id_practica.avance_2?"Si":"No"}</td>
            <td>{element.id_practica.id_empresa.correo}</td>
            <td>{element.id_practica.id_empresa.telefono}</td>
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
        if (filtrado.length >= currentPage + numero_tabla)
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
    
    return(
        <div className="principal">
            <h1 className="tituloPagina">Datos de las residencias</h1>
            <div className="cabecera-wrapper">
                <div className="search">
                    <input type="text" className="search-input" placeholder="search" onChange={handleChangeSearch} onKeyDown={handleKeyDown}></input>
                    <button className="busqueda" onClick={usuarioFiltrado}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
                <div style={{display:"flex",gap:"5px"}}>
                    <button className="agregar" onClick={mostrar}><FontAwesomeIcon icon={faPlus} /><p>Agregar</p></button>
                </div>
            </div>
            <div className="paginacion">
                <button className="paginacion-btn" onClick={prevPage}>Anterior</button>
                <span className="paginacion-text">Registros del {currentPage + 1} al {currentPage + numero_tabla}</span>
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
                    </tr>
                </thead>
                <tbody className="tablaUsuarios-body">
                    {listItems}
                </tbody>
            </Table>
            {/* <ModalUsuarios show={show} setShow={setShow} /> */}
        </div>
    )
}