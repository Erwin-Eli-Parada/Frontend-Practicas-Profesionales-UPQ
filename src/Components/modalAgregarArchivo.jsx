import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/modal.css";
import { FormFile } from "./formularioFile";
import { Form } from 'react-bootstrap';
import APIRoutes from '../functions/rutas';

export function ModalAgregarArchivo({ show, setShow }) {

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState(new FormData());
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('opcion1');
    const [url, setUrl] = useState(APIRoutes.archivoUrl);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = e => {
        setShow(false);
    }

    useEffect(e => {
        console.log(files)
    }, [files]);

    const handleSave = e => {

        formData.set("archivo", files[0]);
        setFormData(formData);
        setIsLoading(true);

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(response => {
                console.log('Success:', response)
                setShow(false);
                window.location.reload(true);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.status)
                alert("Archivo erroneo")
                setIsLoading(false);
            });

        setFormData(new FormData());
    }

    const handleSeleccionarOpcion = (e) => {
        if(e.target.value==="opcion1"){
            setOpcionSeleccionada("opcion1")
            setUrl(APIRoutes.archivoUrl)
        }else if(e.target.value==="opcion2"){
            setOpcionSeleccionada("opcion2")
            setUrl(APIRoutes.archivoEncuestaUrl)
        }
        else{
            setOpcionSeleccionada("opcion3")
            setUrl(APIRoutes.archivoComentarioUrl)
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title className='modal-header-title'>Agregar Datos</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body' style={{justifyContent:"flex-start"}}>
                    <Form.Group controlId="opciones"  style={{display:"flex",justifyContent:"space-around"}}>
                        <Form.Label>Selecciona una opción:</Form.Label>
                        <Form.Check
                            type="radio"
                            name="opcion"
                            label="Excel de datos"
                            value="opcion1"
                            checked={opcionSeleccionada === 'opcion1'}
                            onChange={handleSeleccionarOpcion}
                            aria-label="opcion1"
                        />
                        <Form.Check
                            type="radio"
                            name="opcion"
                            label="Excel de encuestas"
                            value="opcion2"
                            checked={opcionSeleccionada === 'opcion2'}
                            onChange={handleSeleccionarOpcion}
                            aria-label="opcion2"
                        />
                        <Form.Check
                            type="radio"
                            name="opcion"
                            label="Excel de comentarios"
                            value="opcion3"
                            checked={opcionSeleccionada === 'opcion3'}
                            onChange={handleSeleccionarOpcion}
                            aria-label="opcion3"
                        />
                    </Form.Group>
                    <FormFile files={files} setFiles={setFiles} data-test-id="archivo"></FormFile>
                    <div className='cargando'>
                        {isLoading && <p>Cargando...</p>}
                    </div>
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