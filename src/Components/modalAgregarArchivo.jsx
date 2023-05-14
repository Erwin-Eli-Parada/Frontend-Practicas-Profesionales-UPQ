import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/modal.css";
import { FormFile } from "./formularioFile";

export function ModalAgregarArchivo({ show, setShow }) {

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState(new FormData());

    const handleClose = e => {
        setShow(false);
    }

    useEffect(e=>{
        console.log(files)
    },[files]);

    const handleSave = e => {

        formData.set("archivo", files[0]);
        setFormData(formData);

        fetch("http://127.0.0.1:8000/datos/archivo/", {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(response => {
                console.log('Success:', response)
                setShow(false);
                window.location.reload(true);
            })
            .catch(error => {
                console.log(error.status)
                alert("Error de archivo")
            });
        
            setFormData(new FormData());
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