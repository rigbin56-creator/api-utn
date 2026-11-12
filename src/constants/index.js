import { MongooseError } from "mongoose";

const HTTP_MESSAGES = {
    mongooseError: "Tuvimos un error en nuestras bases de datos, intentalo de nuevo en la brevedad",
    getErrorFilms: "Error al obtener las peliculas",
    createErrorFilm: "Error al crear la pelicula",
    patchErrorFilm: "Error al actualizar la pelicula"
}

export { HTTP_MESSAGES }