import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { Menu } from "../Components/menu";
import { MainContext } from "../contexts/mainContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler, BarElement } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import APIRoutes from '../functions/rutas'
import "../styles/dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

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
    const [datosContratacion, setDatosContratacion] = useState([]);
    const [documento, setDocumento] = useState(APIRoutes.documento1);

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

            const contrato = await fetch(APIRoutes.graficaContratoUrl)
                .then(data => data.json())
                .catch(e => {
                    alert('servidor no disponible')
                })
            setDatosContratacion(contrato)
        };
        execute();
    }, []);

    const generarReporte = () => {
        try {
            fetch(documento)
                .then(data => data.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    const reporte = window.open(url, '_blank');
                    reporte.document.title = 'reporte.pdf'
                })
                .catch(e => {
                    alert('servidor no disponible')
                })

        } catch (error) {
            console.error(error)
        }
    }

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
        labels: ['Estancia I', 'Estancia II', 'Estadia'],
        datasets: [
            {
                label: 'Calificación',
                data: [datosCalfTipo.estancia1, datosCalfTipo.estancia2, datosCalfTipo.estadia],
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

    const data11 = {
        labels: ['Contratar', 'No contratar'],
        datasets: [
            {
                label: "%",
                data: [datosContratacion.SI / (datosContratacion.SI + datosContratacion.NO) * 100, datosContratacion.NO / (datosContratacion.SI + datosContratacion.NO) * 100],
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

    return (
        <div className="principal" >
            <h1 className="tituloPagina">Gráficas de los prácticas profesionales</h1>
            <div style={{ display: "flex", justifyContent: "flex-end", margin: "15px 2px" }}>
                <select aria-label="documentoSelect" className='selector' name="documentoSelect" defaultValue={APIRoutes.documento1} onChange={e => { setDocumento(e.target.value) }}>
                    <option value={APIRoutes.documento1}>Métricas</option>
                    <option value={APIRoutes.documento2}>Empresas</option>
                    <option value={APIRoutes.documento3}>Alumnos</option>
                    <option value={APIRoutes.documento4}>Asesores UPQ</option>
                </select>
                <button className="agregar" onClick={generarReporte}><FontAwesomeIcon icon={faFilePdf} /><p> Generar Reportes </p></button>
            </div>
            <div className="graficos">
                <div className="pastel">
                    <div className="graficos-container">
                        <p>Cantidad de procesos por estatus</p>
                        <p className="descripcion">Número de practicas profesionales agrupadas por el estatus en el que se quedaron registradas</p>
                        <Pie data={data} options={options3} />
                    </div>
                    <div className="graficos-container">
                        <p>Cantidad de procesos por carrera</p>
                        <p className="descripcion">Número de alumnos en las practicas profesionales agrupados por cada carrera</p>
                        <Pie data={data3} options={options3} />
                    </div>
                    <div className="graficos-container">
                        <p>Cantidad de procesos por Generación</p>
                        <p className="descripcion">Número de alumnos de practicas profesionales agrupados por la generación a la que pertenecen</p>
                        <Pie data={data7} />
                    </div>
                    <div className="graficos-container">
                        <p>Cantidad de procesos por sexo</p>
                        <p className="descripcion">Número de alumnos agrupados por su sexo</p>
                        <Pie data={data4} />
                    </div>
                    <div className="graficos-container">
                        <p>Cantidad de procesos por tipo</p>
                        <p className="descripcion">Número de alumnos agrupados por el tipo de practica profesional en la que se encuentran</p>
                        <Pie data={data2} />
                    </div>
                    <div className="graficos-container">
                        <p>Cantidad de procesos por giro de la empresa</p>
                        <p className="descripcion">Número de practicas profesionales agrupadas el tipo de empresa en la que se realizan</p>
                        <Pie data={data5} />
                    </div>
                    <div className="graficos-container">
                        <p>Cantidad de procesos por tamaño de la empresa</p>
                        <p className="descripcion">Número de practicas profesionales agrupadas por tamaño de la empresa en la que se realizan</p>
                        <Pie data={data6} />
                    </div>
                    <div className="graficos-container">
                        <p>¿El alumno será contratado al término de su Estadia?</p>
                        <p className="descripcion">Número de alumnos que serian contratados al terminar la estadia de acuerdo a la encuesta del asesor externo</p>
                        <Pie data={data11} />
                    </div>
                </div>
                <div className="barras">
                    <div className="graficos-container linea">
                        <p>sexo por carrera</p>
                        <p className="descripcion">Número de alumnos agrupados por carrera y dividos por su genero</p>
                        <Bar data={data9} />
                    </div>
                    <div className="graficos-container linea">
                        <p>Estatus del proceso por carrera</p>
                        <p className="descripcion">Número de practicas profesionales agrupadas por carrera y diferenciadas de acuerdo al estatus en el que se encuentran</p>
                        <Bar data={data10} options={options2} />
                    </div>
                    <div className="graficos-container linea">
                        <p>Calificación por tipo de proceso</p>
                        <p className="descripcion">Promedio de la calificación de los proyectos a lo largo los tipos de practicas profesionales</p>
                        <Line data={data8} options={options} />
                    </div>
                </div>
            </div>
        </div >
    )
}