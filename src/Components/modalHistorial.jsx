import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/modal.css";
import { useEffect, useState } from "react";

export function ModalHistorial({ show, setShow }) {

    const [registro, setRegistro] = useState([])

    useEffect(() => {
        console.log("registro")
        const execute = async () => {
            const registros = await fetch('http://127.0.0.1:8000/api/historial/')
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setRegistro(registros)
        };
        execute();
    },[show]);

    const lisItems = registro.map(element =>
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.id_usuario}</td>
            <td>{element.username}</td>
            <td>{element.nombre}</td>
            <td>{element.email}</td>
            <td>{element.rol===1 ? "Administrador" : element.rol===2 ? "Staff" : "Estudiante"}</td>
            <td>{element.usuario_elim}</td>
            <td>{element.deleted_date}</td>
        </tr>
    );

    const handleClose = e => {
        setShow(false);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title className='modal-header-title'>Historial</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                    <Table striped bordered hover responsive className="tablaUsuarios">
                        <thead className="tablaUsuarios-head">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">id_usuario</th>
                                <th scope="col">Usuario_eliminado</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Fecha eliminada</th>
                            </tr>
                        </thead>
                        <tbody className="tablaUsuarios-body">
                            {lisItems}
                        </tbody>
                    </Table>
                </Modal.Body>

                <Modal.Footer className='modal-footer'>
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}