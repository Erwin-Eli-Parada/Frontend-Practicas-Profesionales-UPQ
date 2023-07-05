import { useRef, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../styles/modal.css";
import APIRoutes from '../functions/rutas';

export function ModalUsuarios({ show, setShow }) {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [usuario, setUsuario] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(1);

    const [correcto1, setCorrecto1] = useState(true);
    const [correcto2, setCorrecto2] = useState(true);
    const [correcto3, setCorrecto3] = useState(true);
    const [correcto4, setCorrecto4] = useState(true);
    const [correcto5, setCorrecto5] = useState(true);

    const [banner, setBanner] = useState(true);
    const variableRef = useRef(banner);

    const handleClose = e => {
        setShow(false);
        setCorrecto1(true);
        setCorrecto2(true);
        setCorrecto3(true);
        setCorrecto4(true);
        setCorrecto5(true);
    }

    const handleSave = e => {
        console.log("este es el rol", role)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        nombre === "" ? setCorrecto1(false) : setCorrecto1(true)
        apellido === "" ? setCorrecto2(false) : setCorrecto2(true)
        usuario === "" ? setCorrecto3(false) : setCorrecto3(true)
        correo === "" || !emailRegex.test(correo) ? setCorrecto4(false) : setCorrecto4(true)
        password === "" ? setCorrecto5(false) : setCorrecto5(true)

        setBanner(!banner);

    }

    useEffect(() => {
        if (variableRef.current !== banner) {
            if (!correcto1 || !correcto2 || !correcto2 || !correcto3 || !correcto4 || !correcto5) {
                alert("hay uno o más campos no validos");
            } else {

                let superUser = false;
                let staff = false;
                if (role == 1) {
                    superUser = true
                } else if (role == 2) {
                    staff = true
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
                    "nombre": nombre + " " + apellido,
                    "groups": [],
                    "user_permissions": []
                }

                fetch(APIRoutes.loginUrl, {
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
        }
        variableRef.current = banner;
    }, [banner]);

    return (
        <>
            <Modal show={show} onHide={handleClose} className='modal'>
                <Modal.Header closeButton className='modal-header'>
                    <Modal.Title className='modal-header-title'>Agregar Usuario</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                    <input className={correcto1 ? 'modal-body-input' : 'modal-body-bad'} type="text" placeholder='Nombre(s)' onChange={e => { setNombre(e.target.value) }} />
                    <input className={correcto2 ? 'modal-body-input' : 'modal-body-bad'} type="text" placeholder='Apellidos' onChange={e => { setApellido(e.target.value) }} />
                    <input className={correcto3 ? 'modal-body-input' : 'modal-body-bad'} type="text" placeholder='Usuario' onChange={e => { setUsuario(e.target.value) }} />
                    <input className={correcto4? 'modal-body-input' : 'modal-body-bad'} type="email" placeholder='Correo' onChange={e => { setCorreo(e.target.value) }} />
                    <input className={correcto5 ? 'modal-body-input' : 'modal-body-bad'} type="text" placeholder='Contraseña' onChange={e => { setPassword(e.target.value) }} />
                    <select className='modal-body-input' name="select" defaultValue={role} onChange={e => { console.log("valor elegido", e.target.value); setRole(e.target.value) }}>
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