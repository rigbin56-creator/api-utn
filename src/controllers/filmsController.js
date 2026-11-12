import { Film } from '../models/filmModel.js';
import { HTTP_MESSAGES } from '../constants/index.js'
import mongoose from 'mongoose';
import { successResponse } from '../utils/index.js'
import { filmSchema } from '../validators/filmValidators.js';

const filterFilms = async (req, res) => {
    const { title, genre } = req.query
    const filters = {}

    if (req.query.title) {
        filters.title = new RegExp(title, "i")
    }

    if (genre) {
        filters.genre = new RegExp(genre, "i")
    }

    const fimls = await Film.find(filtes)
    res.json(films)
}

const getFilms = async (req, res) => {
    try {
        const films = await Film.find()
        res.json(successResponse(films, "Peliculas recuperadas con exito!"))

    } catch (error) {
        if (error.name === "MongooseError") {
            res.status(500).json({ 
                success: false,
                message: HTTP_MESSAGES.mongooseError
             })
        }
        res.status(500).json({
            success: false,
            message: HTTP_MESSAGES.getErrorFilms.getErrorFilms
        })
    }
}

//  crear films
const postFilm = async (req, res) => {
    try {
        const body = req.body
    const currentYear = new Date().getFullYear

    const { title, year } = body
    // if (!title || !year) {
    //     return res.status(400).json({ error: "Datos invalidos, para crear una pelicula se rqeuire al menos un titulo y año de estreno"})
    // }

    // if (year < 1888 || year > currentYear) {
    //     return res.status(400).json({ error: `El año de estreno tiene que ser mayor al año 1888 o menor al ${currentYear}`})
    // }

    //  incluir validaciones
    const validation = filmSchema.partial().safeParse(body)

    if (!validation.success) {
        return res.status(400).json({ error: validation.error.issues.map(e => ({ origin: e.path[0], message: e.message })) })
    }

    const foundFilm = await File.findOne({title: body.title })

    if (foundFilm) {
        return res.status(409).json({ error: "La pelicula ya existe en la base de datos!!"})
    }

    const newFilm = await Film.create(body)
    res.status(201).json(successResponse(newFilm, "Pelicula creada exitosamente!"))
    } catch (error) {
        res.status(500).json({ error: HTTP_MESSAGES.createErrorFilm})
    }
}

//  actualizar algun film
const patchFilm = async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    if (!mongoose.isValidObjectId(id)) {
        const error = new Error("ID no valido")
        error.name = "invalidId"
        throw error
    }

    const updateFilm = await Film.findByIdAndUpdate(id, body, { new: true})
    if (!updateFilm) {
        return res.status(404).json({ error: "La pelicula no se encuentra en nuestra base de datos"})
    }
    res.json(updateFilm)
    } catch (error) {
        if (error.name === "invalidId") {
            return res.status(400).json({ error: "ID invalido, debe ser en formato ObjectID"})
        }

        res.status(500).json({ error: HTTP_MESSAGES.patchErrorFilm })
    }
}

//  borrar algun film
const deleteFilm = async (req, res) => {
    try {
        const id = req.params.id

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: "La pelicula no se encuentra en nuestra base de datos"})
        }

    const deletedFilm = await Film.findByIdAndUpdate(id)

    if (!deletedFilm) {
        return res.status(404).json({ error: "La pelicula no se encuentra en nuestra base de datos"})
    }

    res.json(successResponse(deleteFilm, "Pelicula borrada con exito!"))
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({ error: "El ID debe ser formato ObjectID"})
        }
        res.status(500).json({ error: "Disculpe, tuvimos un error, intentelo nuevamente"})
    }
}

export { filterFilms, getFilms, postFilm, patchFilm, deleteFilm }