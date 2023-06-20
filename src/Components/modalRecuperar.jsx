import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/modalRecuperar.css";
import { useState } from "react";
import APIRoutes from '../functions/rutas'

export function ModalRecuperar({ show, setShow}) {

    const [email, setEmail] = useState("")

    const handleClose = e => {
        setShow(false);
    }

    const handleEnviar = () => {
        let data = {
            "correo": email
        }

        fetch(APIRoutes.recuperarUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200){
                    alert("Correo enviado")
                    setShow(false);
                    window.location.reload(true);
                }else{
                    alert("Correo no existente")
                }
            })
            .catch(error => console.log(error));
    }

    const handleChangeUsuario = (e)=> {
        setEmail(e.target.value);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title className='modal-header-title'>Recuperar contraseña</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                    <h5>Ingrese su correo para que se le envie la nueva contraseña</h5>
                    <input type="email" className="input" placeholder="Correo" onChange={handleChangeUsuario} required/>
                </Modal.Body>

                <Modal.Footer className='modal-footer'>
                    <Button variant="submit" onClick={handleEnviar}>
                        Enviar
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}