import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { Menu } from "../Components/menu";
import { MainContext } from "../contexts/mainContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import APIRoutes from '../functions/rutas'

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard(props) {

    const { state } = useLocation()

    const { setUsuario, setAuth, setStaff, setSuperUser } = useContext(MainContext)

    setUsuario(state.usuario)
    setAuth(state.auth)
    setStaff(state.permiso)
    setSuperUser(state.superUsuario)

    const [datosTipo, setDatosTipo] = useState({});

    useEffect(() => {
        const execute = async () => {
            const usuarios = await fetch(APIRoutes.graficaTipoUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            
            setDatosTipo(usuarios)
        };
        execute();        
    }, []);

    useEffect(()=>{
        console.log(datosTipo)
    },[datosTipo]);

    const data = {
        labels: ['Autorizado', 'Concluido', 'Corregir Información', 'solicitud', 'Rechazado', 'Reprobado'],
        datasets: [
            {
                label: '# de resgitros',
                data: [datosTipo.autorizado, datosTipo.concluido, datosTipo.corregir_info, datosTipo.solicitud, datosTipo.rechazado, datosTipo.reprobado],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="principal" >
            <h1 className="tituloPagina">Dashboard</h1>
            <div className="graficos">
                <div className="grafico-container">
                    <Pie data={data} />
                </div>
            </div>
        </div >
    )
}