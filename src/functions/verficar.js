import APIRoutes from './rutas'

export default function verificar(usuario, password, navigate) {

    fetch(APIRoutes.loginUrl + usuario + "/" + password)
        .then(data => {
            if (data.status === 401) {
                alert('Usuario o contraseña incorrecta');
            } else {
                return data.json()
            }
        })
        .then(res => {
            console.log(res.id, res.is_active, res.is_superuser)
            if (res.id === undefined) {
                alert('Usuario o contraseña incorrecta');
            } else if (res.is_active) {
                console.log("verificado", res.is_active)
                if (!res.is_staff && !res.is_superuser) {
                    navigate('/alumno', {
                        replace: true,
                        state: {
                            usuario: res.username,
                            password: password,
                            auth: res.is_active,
                            permiso: res.is_staff,
                            superUsuario: res.is_superuser,
                            correo: res.email,
                        }
                    })
                } else {
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
                }
            } else {
                alert('Usuario o contraseña incorrecta');
            }
        }).catch(e => {
            // alert('servidor no disponible')
        })


}