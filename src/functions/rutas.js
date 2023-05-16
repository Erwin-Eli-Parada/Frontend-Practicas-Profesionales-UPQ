class APIRoutes {
    static baseUrl = 'http://127.0.0.1:8000/';

    static loginUrl = this.baseUrl+"api/usuario/"
    static historialUrl = this.baseUrl+"api/historial/"

    static datosUrl = this.baseUrl+"datos/alumno/"
    static encuestaUrl = this.baseUrl+"datos/encuestaAlumno/"
    static archivoUrl = this.baseUrl+"datos/archivo/"
    static archivoEncuestaUrl = this.baseUrl+"datos/archivoEncuesta/"
}

export default APIRoutes;