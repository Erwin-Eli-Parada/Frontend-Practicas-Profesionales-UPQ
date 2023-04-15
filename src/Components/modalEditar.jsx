import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/modal.css";

export function ModalEditar({ show, setShow, elemento}) {

    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(1);

    useEffect(() => {
        setNombre(elemento.nombre);
        setUsuario(elemento.username);
        setCorreo(elemento.email);
        setPassword(elemento.password);
        elemento.is_superuser ? setRole(1) : elemento.is_staff ? setRole(2) : setRole(3);
    }, [show])

    const handleClose = e => {
        setShow(false);
    }

    const handleSave = e => {
        console.log("este es el rol",role)

        let superUser=false;
        let staff=false;
        if(role == 1){
            superUser=true
        }else if(role == 2){
            staff=true
        }
        
        let data = {
            "password": password,
            "last_login": null,
            "is_superuser": superUser,
            "first_name": "",
            "last_name": "",
            "is_staff": staff,
            "is_active": true,
            "username": usuario,
            "email": correo,
            "nombre": nombre,
            "groups": [],
            "user_permissions": []
        }

        fetch("http://127.0.0.1:8000/api/usuario/", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.log(error))
            .then(response => {
                let alerta="";
                if(response.hasOwnProperty('username') && response.username[0]==="user with this Nombre de usuario already exists."){
                    alert("usuario repetido")
                }
                if(response.hasOwnProperty('email') && response.email[0]==="user with this Correo Electronico already exists."){
                    alert("email repetido")
                }
                console.log('Success:', response)
                return alerta;
            });

        setShow(false);
        window.location.reload(true);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title className='modal-header-title'>Editar Usuario</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                    <label for="nombre" className='etiqueta'>Nombre</label>
                    <input id="nombre" className='modal-body-input' type="text" placeholder='Nombre(s)' value={nombre} onChange={e => { setNombre(e.target.value) }} />
                    <label for="usuario" className='etiqueta'>Usuario</label>
                    <input id="usuario" className='modal-body-input' type="text" placeholder='Usuario' value={usuario} onChange={e => { setUsuario(e.target.value) }} />
                    <label for="correo" className='etiqueta'>Correo</label>
                    <input id="correo" className='modal-body-input' type="email" placeholder='Correo' value={correo} onChange={e => { setCorreo(e.target.value) }} />
                    <label for="password" className='etiqueta'>Contraseña</label>
                    <input id="password" className='modal-body-input' type="text" placeholder='Contraseña' value={password} onChange={e => { setPassword(e.target.value) }} />
                    <label for="role" className='etiqueta'>Rol</label>
                    <select id="role" className='modal-body-input' name="select" value={role} onChange={e => { console.log("valor elejido",e.target.value); setRole(e.target.value) }}>
                        <option value={1}>Administrador</option>
                        <option value={2}>Staff</option>
                        <option value={3}>Estudiante</option>
                    </select>
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