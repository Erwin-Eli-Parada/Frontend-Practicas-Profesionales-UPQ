import React, { useContext, useEffect, useState } from "react";
// import { Menu } from "../Components/menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus, faMagnifyingGlass,faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { ModalUsuarios } from "../Components/modalAgregar";
import { ModalEditar } from "../Components/modalEditar";
import { MainContext } from "../contexts/mainContext";
import { ModalHistorial } from "../Components/modalHistorial";
import { Table } from "react-bootstrap";
import "../styles/admin.css";
import APIRoutes from '../functions/rutas'

export function Admin(props) {

    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const [filtrado, setFiltrado] = useState([]);
    const [show, setShow] = useState(false);  //Show 1 modal agregar, Show 2 modal editar, Show 3 modal historial
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [usuario, setUsuario] = useState({});

    const contexto = useContext(MainContext)

    const numero_tabla = 9; //numero de registros a ver en la tabla

    useEffect(() => {
        const execute = async () => {
            const usuarios = await fetch(APIRoutes.loginUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            console.log(usuarios)
            setUsuarios(usuarios)
            setFiltrado(usuarios.slice(currentPage, currentPage + numero_tabla))
        };
        execute();
    }, []);

    useEffect(() => {
        usuarioFiltrado()
    }, [currentPage])

    useEffect(() => {
        usuarioFiltrado()
    }, [search])

    // const buscar = async e => {
    //     let usuarios = await fetch('http://127.0.0.1:8000/api/usuario/')
    //         .then(data => data.json())
    //         .catch(e => {
    //             alert('servidor no disponible')
    //         })
    //     // console.log(usuarios)
    //     return usuarios;
    // }
    //nuevo arreglo filtrado

    console.log("usuarios", usuarios)

    const usuarioFiltrado = () => {
        if (search.length === 0)
            return setFiltrado(usuarios.slice(currentPage, currentPage + numero_tabla));

        const filtrados = usuarios.filter(element =>
            element.username.includes(search) ||
            element.nombre.includes(search) ||
            element.email.includes(search) ||
            element.id === search
        );
        return setFiltrado(filtrados.slice(currentPage, currentPage + numero_tabla));
    }

    console.log("usuario filtrado", filtrado.length)
    console.log("Pagina actual", currentPage)
    console.log("busqueda", search.length)

    const lisItems = filtrado.map(element =>
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.username}</td>
            <td>{element.nombre}</td>
            <td>{element.email}</td>
            <td>{element.is_superuser ? "Administrador" : element.is_staff ? "Staff" : "Estudiante"}</td>
            <td className="fila-botones">
                <button className="editar" onClick={e => { setUsuario(element); setShow2(true) }}><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button className="eliminar" onClick={() => {

                    let rol = element.is_superuser ? 1 : element.is_staff ? 2 : 3

                    let data = {
                        "id_usuario": element.id,
                        "username": element.username,
                        "email": element.email,
                        "nombre": element.nombre,
                        "password": element.password,
                        "rol": rol,
                        "usuario_elim": contexto.usuario
                    }

                    fetch(APIRoutes.historialUrl, {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(
                        fetch(APIRoutes.loginUrl + element.id + "/", { method: 'DELETE' })
                            .then(() => { alert("Borrado con exito"); window.location.reload(true); })
                            .catch(error => console.log(error))
                    )
                }}><FontAwesomeIcon icon={faTrash} /></button>
            </td>
        </tr>
    );

    //metodos On
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

    const mostrar2 = e => {
        setShow3(true)
    }

    return (
        <div className="principal">
            <h1 className="tituloPagina">Administración de usuarios</h1>
            <div className="cabecera-wrapper">
                <div className="search">
                    <input type="text" className="search-input" placeholder="search" onChange={handleChangeSearch} onKeyDown={handleKeyDown}></input>
                    <button className="busqueda" onClick={usuarioFiltrado}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
                <div style={{display:"flex",gap:"5px"}}>
                    <button className="agregar" onClick={mostrar2}><FontAwesomeIcon icon={faClockRotateLeft} /><p>Historial</p></button>
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
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody className="tablaUsuarios-body">
                    {lisItems}
                </tbody>
            </Table>
            <ModalUsuarios show={show} setShow={setShow} />
            <ModalEditar show={show2} setShow={setShow2} elemento={usuario} />
            <ModalHistorial show={show3} setShow={setShow3}/>
        </div>
    )
}