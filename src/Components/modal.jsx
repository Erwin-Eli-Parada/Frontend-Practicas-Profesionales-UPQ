import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function ModalUsuarios({ show, setShow }) {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(1);

    const handleClose = e => {
        setShow(false);
    }

    const handleSave = e => {
        let data = {
            "password": password,
            "last_login": null,
            "is_superuser": role === 1 ? true : false,
            "first_name": "",
            "last_name": "",
            "is_staff": role === 2 ? true : false,
            "is_active": true,
            "username": usuario,
            "email": correo,
            "nombre": nombre + " " + apellido,
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
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Usuario</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input type="text" placeholder='Nombre(s)' onChange={e => { setNombre(e.target.value) }} />
                    <input type="text" placeholder='Apellidos' onChange={e => { setApellido(e.target.value) }} />
                    <input type="text" placeholder='Usuario' onChange={e => { setUsuario(e.target.value) }} />
                    <input type="email" placeholder='Correo' onChange={e => { setCorreo(e.target.value) }} />
                    <input type="text" placeholder='Contraseña' onChange={e => { setPassword(e.target.value) }} />
                    <select name="select" defaultValue={role} onChange={e => { setRole(e.target.value) }}>
                        <option value={1} >Administrador</option>
                        <option value={2}>Staff</option>
                        <option value={3}>Estudiante</option>
                    </select>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
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