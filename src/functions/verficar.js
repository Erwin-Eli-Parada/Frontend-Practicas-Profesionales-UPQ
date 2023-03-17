export default function verificar(usuario, password, navigate) {

    fetch('http://127.0.0.1:8000/api/usuario/' + usuario + "/" + password)
        .then(data => data.json())
        .then(res => {
            console.log(res.id, res.is_active, res.is_superuser)
            if (res.id === undefined) {
                alert('Usuario o contraseña incorrecta');
            } else if (res.is_active) {
                console.log("verificado", res.is_active)
                navigate('/dashboard', {
                    replace: true,
                    state: {
                        usuario: res.username,
                        password: password,
                        auth: res.is_active,
                        permiso: res.is_staff,
                        superUsuario: res.is_superuser
                    }
                })
            } else {
                alert('Usuario o contraseña incorrecta');
            }
        }).catch( e =>{
            alert('servidor no disponible')
        })


}