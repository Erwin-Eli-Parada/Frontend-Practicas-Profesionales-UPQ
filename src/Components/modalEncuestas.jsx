import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/modal.css";
import { useEffect, useState } from "react";
import APIRoutes from '../functions/rutas'

export function ModalEncuestas({ show, setShow, alumno }) {

    const [registro, setRegistro] = useState([])

    useEffect(() => {
        if (alumno != "0") {
            console.log("registro")
            const execute = async () => {
                const registros = await fetch(APIRoutes.encuestaUrl + alumno)
                    .then(data => data.json())
                    .catch(e => {
                        alert('servidor no disponible')
                    })
                setRegistro(registros)
            };
            execute();
        }
    }, [show]);

    const lisItems = registro.map(element =>
        <tr key={element.id_encuesta}>
            <td>{element.descripcion}</td>
            <td>{element.valor_descripcion}</td>
            <td>{element.pregunta}</td>
            <td>{element.valor}</td>
        </tr>
    );

    const handleClose = e => {
        setShow(false);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title className='modal-header-title'>Encuesta</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                    <Table striped bordered hover responsive className="tablaUsuarios">
                        <thead className="tablaUsuarios-head">
                            <tr>
                                <th scope="col">Descripción</th>
                                <th scope="col">Valor descripcion</th>
                                <th scope="col">Pregunta</th>
                                <th scope="col">Valor</th>
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