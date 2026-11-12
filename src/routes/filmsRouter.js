import { Router } from 'express';
import { deleteFilm, filterFilms, getFilms, patchFilm, postFilm } from '../controllers/filmsController.js';

const filmsRouter = Router()

filmsRouter.get("/search", filterFilms)
filmsRouter.get("/", getFilms)
filmsRouter.post("/", postFilm)
filmsRouter.patch("/:id", patchFilm)
filmsRouter.delete("/:id", deleteFilm)

export { filmsRouter }