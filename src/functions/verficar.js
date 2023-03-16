export default function verificar(usuario, password, navigate) {

    fetch('http://127.0.0.1:8000/api/usuario/' + usuario + "/" + password)
        .then(data => data.json())
        .then(res => {
            console.log(res.id, res.is_active)
            if (res.id === undefined) {
                alert('Usuario o contraseña incorrecta');
            } else if (res.is_active) {
                console.log("verificado", res.is_active)
                navigate('/dashboard', {
                    replace: true,
                    state: {
                        usuario: usuario,
                        password: password,
                        auth: res.is_active
                    }
                })
            } else {
                alert('Usuario o contraseña incorrecta');
            }
        })


}