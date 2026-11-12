import express from "express"
import cors from "cors"
import { filmsRouter } from "./routes/filmsRouter.js"
import { connectMongoDb } from "./config/connectMongoDb.js"
import { usersRouter } from "./routes/usersRouter.js"
import { authMiddleware } from "./middleware/authMiddleware.js"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT
const URI_DB = process.env.URI_DB

const app = express()
app.use(express.json())
app.use(cors())

app.use("/films", authMiddleware,filmsRouter)
app.use("/users", usersRouter)

app.use("", (req, res) => {
    res.status(404).json({ error: "No se encuentra el recurso"})
})

app.listen(PORT, () => {
    console.log("URI_DB:", URI_DB)
    connectMongoDb(URI_DB)
    console.log(`Servidor en escucha en el puerto http://localhost:${PORT}`)
})
