export default function verificar(usuario, password){
    
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(data => data.json())
    .then(res => {console.log(res)})

    if (usuario === "alacante23" && password === "1234") {
        return true;
    }else{
        return false;
    }
}