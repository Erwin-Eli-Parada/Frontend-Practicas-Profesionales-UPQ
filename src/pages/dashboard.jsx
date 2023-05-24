import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { Menu } from "../Components/menu";
import { MainContext } from "../contexts/mainContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, } from 'chart.js';
import { Pie, Line} from 'react-chartjs-2';
import APIRoutes from '../functions/rutas'
import "../styles/dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

export function Dashboard(props) {

    const { state } = useLocation()

    const { setUsuario, setAuth, setStaff, setSuperUser } = useContext(MainContext)

    setUsuario(state.usuario)
    setAuth(state.auth)
    setStaff(state.permiso)
    setSuperUser(state.superUsuario)

    const [datosTipo, setDatosTipo] = useState({});
    const [datosStatus, setDatosStatus] = useState({});
    const [datosCarreras, setDatosCarreras] = useState({});

    useEffect(() => {
        const execute = async () => {
            const usuarios = await fetch(APIRoutes.graficaStatusUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            
            setDatosStatus(usuarios)
        };
        execute();        
    }, []);

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

    useEffect(() => {
        const execute = async () => {
            const usuarios = await fetch(APIRoutes.graficaCarreraUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            
            setDatosCarreras(usuarios)
        };
        execute();        
    }, []);

    const data = {
        labels: ['Autorizado', 'Concluido', 'Corregir Información', 'solicitud', 'Rechazado', 'Reprobado'],
        datasets: [
            {
                label: '# de resgitros',
                data: [datosStatus.autorizado, datosStatus.concluido, datosStatus.corregir_info, datosStatus.solicitud, datosStatus.rechazado, datosStatus.reprobado],
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

    const data2 = {
        labels: ['Estadia', 'Estancia I', 'Estancia II'],
        datasets: [
            {
                label: '# de resgitros',
                data: [datosTipo.estadia, datosTipo.estancia1, datosTipo.estancia2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const data3 = {
        labels: ['Automotriz', 'Manufactura', 'Mecatronica', 'Negocios', 'PYMES', 'PYMES EJECUTIVA', 'Sistemas', 'Telematica'],
        datasets: [
            {
                label: '# de resgitros',
                data: [datosCarreras.automotriz, datosCarreras.manufactura, datosCarreras.mecatronica, datosCarreras.negocios, datosCarreras.pymes, datosCarreras.pymes_eje, datosCarreras.sistemas, datosCarreras.telematica],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',                   
                    'rgba(255, 120, 80, 0.2)',
                    'rgba(255, 180, 120, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',                   
                    'rgba(255, 100, 80, 1)',
                    'rgba(255, 200, 115, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="principal" >
            <h1 className="tituloPagina">Dashboard</h1>
            <div className="graficos">
                <div className="graficos-container">
                    <p>Cantidad de procesos por estatus</p>
                    <Pie data={data}/>
                </div>
                <div className="graficos-container">
                    <p>Cantidad de procesos por tipo</p>
                    <Pie data={data2}/>
                </div>
                <div className="graficos-container">
                    <Pie data={data3}/>
                </div>
                <div className="graficos-container">
                    <Pie data={data}/>
                </div>
                <div className="graficos-container linea">
                    <Line data={data}/>
                </div>
                <div className="graficos-container linea">
                    <Line data={data}/>
                </div>
            </div>
        </div >
    )
}