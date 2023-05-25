import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { Menu } from "../Components/menu";
import { MainContext } from "../contexts/mainContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import APIRoutes from '../functions/rutas'
import "../styles/dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilePdf } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Filler);

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
    const [datosGeneros, setDatosGeneros] = useState({});
    const [datosGiros, setDatosGiros] = useState({});
    const [datosTamanios, setDatosTamanios] = useState({});
    const [datosGeneracion, setDatosGeneracion] = useState([]);
    const [datosCalfTipo, setDatosCalfTipo] = useState([]);
    const [datosGenCarrera, setDatosGenCarrera] = useState([]);
    const [datosStatusCarrera, setDatosStatusCarrera] = useState([]);

    useEffect(() => {
        const execute = async () => {
            const status = await fetch(APIRoutes.graficaStatusUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosStatus(status)

            const tipo = await fetch(APIRoutes.graficaTipoUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosTipo(tipo)

            const carrera = await fetch(APIRoutes.graficaCarreraUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosCarreras(carrera)

            const genero = await fetch(APIRoutes.graficaGeneroUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosGeneros(genero)

            const giro = await fetch(APIRoutes.graficaGiroUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosGiros(giro)

            const tama = await fetch(APIRoutes.graficaTamanioUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosTamanios(tama)

            const gen = await fetch(APIRoutes.graficaGeneracionUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosGeneracion(gen)

            const calftipo = await fetch(APIRoutes.graficaCalificacionTiponUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosCalfTipo(calftipo)

            const gencarrera = await fetch(APIRoutes.graficaGenCarreraUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosGenCarrera(gencarrera)

            const statuscarrera = await fetch(APIRoutes.graficaStatusCarreraUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosStatusCarrera(statuscarrera)
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
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
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
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
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
        labels: ['Automotriz', 'Manufactura', 'Mecatronica', 'Negocios', 'PYMES', 'PYMES Ejecutiva', 'Sistemas', 'Telematica'],
        datasets: [
            {
                label: '# de resgitros',
                data: [datosCarreras.automotriz, datosCarreras.manufactura, datosCarreras.mecatronica, datosCarreras.negocios, datosCarreras.pymes, datosCarreras.pymes_eje, datosCarreras.sistemas, datosCarreras.telematica],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 120, 80, 0.5)',
                    'rgba(255, 180, 120, 0.5)',
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

    const options3 = {
        plugins: {
            legend: {
                position: 'right',
            }
        }
    }

    const data4 = {
        labels: ['Masculino', 'Femenino'],
        datasets: [
            {
                label: '# de resgitros',
                data: [datosGeneros.hombre, datosGeneros.mujer],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const data5 = {
        labels: ['investigacion', 'privada', 'publica', 'social'],
        datasets: [
            {
                label: '# de resgitros',
                data: [datosGiros.investigacion, datosGiros.privada, datosGiros.publica, datosGiros.social],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const data6 = {
        labels: ['Grande', 'Mediana', 'Micro', 'Pequeña'],
        datasets: [
            {
                label: '# de resgitros',
                data: [datosTamanios.g, datosTamanios.m, datosTamanios.mc, datosTamanios.p],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    let generacion = datosGeneracion.map(item => item.generacion)
    let numGeneracion = datosGeneracion.map(item => item.cantidad)
    const data7 = {
        labels: generacion,
        datasets: [
            {
                label: '# de resgitros',
                data: numGeneracion,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 120, 80, 0.5)',
                    'rgba(255, 180, 120, 0.5)',
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

    const data8 = {
        labels: ['Estadia', 'Estancia I', 'Estancia II'],
        datasets: [
            {
                label: 'Calificación',
                data: [datosCalfTipo.estadia, datosCalfTipo.estancia1, datosCalfTipo.estancia2],
                fill: true,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: 'rgb(255, 99, 132)'
                }
            }
        },
        scales: {
            y: {
                suggestedMin: 7,
                suggestedMax: 10,
                title: {
                    display: true,
                    text: 'Calificación',
                }
            },
        },
    };

    const data9 = {
        labels: ['Automotriz', 'Manufactura', 'Mecatronica', 'Negocios', 'PYMES', 'PYMES Ejecutiva', 'Sistemas', 'Telematica'],
        datasets: [
            {
                label: 'Masculino',
                data: datosGenCarrera.hombre,
                borderColor: 'rgba(54, 162, 235, 0.2)',
                backgroundColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'Femenino',
                data: datosGenCarrera.mujer,
                borderColor: 'rgba(255, 99, 132, 0.2)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    };

    const data10 = {
        labels: ['Automotriz', 'Manufactura', 'Mecatronica', 'Negocios', 'PYMES', 'PYMES Ejecutiva', 'Sistemas', 'Telematica'],
        datasets: [
            {
                label: 'Autorizado',
                data: datosStatusCarrera.autorizado,
                borderColor: 'rgba(54, 162, 235, 0.2)',
                backgroundColor: 'rgba(54, 162, 235, 1)',
            },
            {
                label: 'Concluido',
                data: datosStatusCarrera.concluido,
                borderColor: 'rgba(255, 99, 132, 0.2)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Corregir información',
                data: datosStatusCarrera.corregir_info,
                borderColor: 'rgba(255, 206, 86, 0.2)',
                backgroundColor: 'rgba(255, 206, 86, 1)',
            },
            {
                label: 'Rechazado',
                data: datosStatusCarrera.rechazado,
                borderColor: 'rgba(75, 192, 192, 0.2)',
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Reprobado',
                data: datosStatusCarrera.reprobado,
                borderColor: 'rgba(153, 102, 255, 0.2)',
                backgroundColor: 'rgba(153, 102, 255, 1)',
            },
            {
                label: 'Solicitud',
                data: datosStatusCarrera.solicitud,
                borderColor: 'rgba(255, 159, 64, 0.2)',
                backgroundColor: 'rgba(255, 159, 64, 1)',
            },
        ],
    };

    const options2 = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    }

    return (
        <div className="principal" >
            <h1 className="tituloPagina">Dashboard</h1>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "15px 2px"}}>
                <button className="agregar"><FontAwesomeIcon icon={faFilePdf} /><p> Generar Reporte </p></button>
            </div>
            <div className="graficos">
                <div className="graficos-container">
                    <p>Cantidad de procesos por estatus</p>
                    <Pie data={data} options={options3} />
                </div>
                <div className="graficos-container">
                    <p>Cantidad de procesos por carrera</p>
                    <Pie data={data3} options={options3} />
                </div>
                <div className="graficos-container">
                    <p>Cantidad de procesos por Generación</p>
                    <Pie data={data7} />
                </div>
                <div className="graficos-container">
                    <p>Cantidad de procesos por genero</p>
                    <Pie data={data4} />
                </div>
                <div className="graficos-container">
                    <p>Cantidad de procesos por tipo</p>
                    <Pie data={data2} />
                </div>
                <div className="graficos-container">
                    <p>Cantidad de procesos por giro de la empresa</p>
                    <Pie data={data5} />
                </div>
                <div className="graficos-container">
                    <p>Cantidad de procesos por tamaño de la empresa</p>
                    <Pie data={data6} />
                </div>
                <div className="graficos-container linea">
                    <p>Calificacion por tipo de proceso</p>
                    <Bar data={data9} />
                </div>
                <div className="graficos-container linea">
                    <p>Etstaus del proceso por carrera</p>
                    <Bar data={data10} options={options2} />
                </div>
                <div className="graficos-container linea">
                    <p>Calificacion por tipo de proceso</p>
                    <Line data={data8} options={options} />
                </div>
            </div>
        </div >
    )
}