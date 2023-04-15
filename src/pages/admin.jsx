import React, { useEffect, useState } from "react";
// import { Menu } from "../Components/menu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Table } from "react-bootstrap";
import { ModalUsuarios } from "../Components/modalAgregar";
import { ModalEditar } from "../Components/modalEditar";
import "../styles/admin.css";

export function Admin(props) {

    const [usuarios, setUsuarios] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState('');
    const [filtrado, setFiltrado] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [usuario, setUsuario] = useState({});

    const numero_tabla = 9; //numero de registros a ver en la tabla

    useEffect(() => {
        const execute = async () => {
            const usuarios = await fetch('http://127.0.0.1:8000/api/usuario/')
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
                <button className="editar" onClick={e => {setUsuario(element); setShow2(true)}}><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button className="eliminar"><FontAwesomeIcon icon={faTrash} /></button>
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

    return (
        <div className="principal">
            <h1 className="tituloPagina">Administración</h1>
            <div className="cabecera-wrapper">
                <div className="search">
                    <input type="text" className="search-input" placeholder="search" onChange={handleChangeSearch} onKeyDown={handleKeyDown}></input>
                    <button className="busqueda" onClick={usuarioFiltrado}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </div>
                <button className="agregar" onClick={mostrar}><FontAwesomeIcon icon={faPlus} /><p>Agregar</p></button>
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
            <ModalUsuarios show={show} setShow={setShow}/>
            <ModalEditar show={show2} setShow={setShow2} elemento={usuario}/>
        </div>
    )
}