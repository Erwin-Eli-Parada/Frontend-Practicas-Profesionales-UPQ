export default function verificar(usuario, password, navigate) {

    fetch('https://drfpracticasprofesionalestest.onrender.com/api/usuario/' + usuario)
        .then(data => data.json())
        .then(res => {
            console.log(res.id, res.is_active)
            if (res.id == null) {
                return false;
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
                return false;
            }
        })


}