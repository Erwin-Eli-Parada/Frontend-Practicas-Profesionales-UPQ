class APIRoutes {
    static baseUrl = 'http://127.0.0.1:8000/';

    static loginUrl = this.baseUrl+"api/usuario/"
    static historialUrl = this.baseUrl+"api/historial/"

    static datosUrl = this.baseUrl+"datos/alumno/"
    static encuestaUrl = this.baseUrl+"datos/encuestaAlumno/"
    static archivoUrl = this.baseUrl+"datos/archivo/"
    static archivoEncuestaUrl = this.baseUrl+"datos/archivoEncuesta/"

    static graficaStatusUrl = this.baseUrl+"grafico/status"
    static graficaTipoUrl = this.baseUrl+"grafico/tipo"
    static graficaCarreraUrl = this.baseUrl+"grafico/carrera"
    static graficaGeneroUrl = this.baseUrl+"grafico/genero"
    static graficaGiroUrl = this.baseUrl+"grafico/giro"
    static graficaTamanioUrl = this.baseUrl+"grafico/tamanio"
    static graficaGeneracionUrl = this.baseUrl+"grafico/generacion"
    static graficaCalificacionTiponUrl = this.baseUrl+"grafico/calificacionTipo"
    static graficaGenCarreraUrl = this.baseUrl+"grafico/generoCarrera"
}

export default APIRoutes;