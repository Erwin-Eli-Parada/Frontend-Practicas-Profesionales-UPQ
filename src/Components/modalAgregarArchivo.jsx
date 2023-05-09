import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/modal.css";
import {FormFile} from "./formularioFile";

export function ModalAgregarArchivo({ show, setShow }) {

    const [files, setFiles] = useState([]);

    const handleClose = e => {
        setShow(false);
    }

    const handleSave = e => {

        let data = {}

        fetch("http://127.0.0.1:8000/api/usuario/", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                if (response.hasOwnProperty('username') && response.username[0] === "Este usuario ya existe") {
                    alert("Este usuario ya existe")
                } else if (response.hasOwnProperty('email') && response.email[0] === "Este correo electrónico ya existe") {
                    alert("Este correo electrónico ya existe")
                } else {
                    console.log('Success:', response)
                    setShow(false);
                    window.location.reload(true);
                }
            })
            .catch(error => console.log(error));
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title className='modal-header-title'>Agregar Datos</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                    <FormFile files={files} setFiles={setFiles}></FormFile>
                </Modal.Body>

                <Modal.Footer className='modal-footer'>
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}