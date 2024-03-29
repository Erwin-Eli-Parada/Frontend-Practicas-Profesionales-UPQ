class APIRoutes {
    // static baseUrl = 'http://127.0.0.1:8000/';
    static baseUrl = 'https://drfpracticasprofesionalestest.onrender.com/';
    
    static loginUrl = this.baseUrl+"api/usuario/"
    static historialUrl = this.baseUrl+"api/historial/"
    static recuperarUrl = this.baseUrl+"api/usuario/recuContra/"

    static datosUrl = this.baseUrl+"datos/alumno/"
    static encuestaUrl = this.baseUrl+"datos/encuestaAlumno/"
    static comentarioUrl = this.baseUrl+"datos/comentarioAlumno/"
    static archivoUrl = this.baseUrl+"datos/archivo/"
    static archivoEncuestaUrl = this.baseUrl+"datos/archivoEncuesta/"
    static archivoComentarioUrl = this.baseUrl+"datos/archivoComentario/"

    static graficaStatusUrl = this.baseUrl+"grafico/status"
    static graficaTipoUrl = this.baseUrl+"grafico/tipo"
    static graficaCarreraUrl = this.baseUrl+"grafico/carrera"
    static graficaGeneroUrl = this.baseUrl+"grafico/genero"
    static graficaGiroUrl = this.baseUrl+"grafico/giro"
    static graficaTamanioUrl = this.baseUrl+"grafico/tamanio"
    static graficaGeneracionUrl = this.baseUrl+"grafico/generacion"
    static graficaCalificacionTiponUrl = this.baseUrl+"grafico/calificacionTipo"
    static graficaGenCarreraUrl = this.baseUrl+"grafico/generoCarrera"
    static graficaStatusCarreraUrl = this.baseUrl+"grafico/statusCarrera"
    static graficaContratoUrl = this.baseUrl+"grafico/contrato"

    static documento1 = this.baseUrl+"documento/estadisticas"
    static documento2 = this.baseUrl+"documento/empresas"
    static documento3 = this.baseUrl+"documento/nombres"
    static documento4 = this.baseUrl+"documento/asesor"

    static infoAlumno = this.baseUrl+"datos/infoAlumno/"
}

export default APIRoutes;