import { Router } from "express"
import { getUsers, registerUser, loginUser } from "../controllers/usersController.js"

const usersRouter = Router()

usersRouter.get("/", getUsers)

// usersRouter.post("/", (req, res) => {
//     res.json({ message: "Creando usuario" })
// })

//  resgister
usersRouter.post("/register", registerUser)

usersRouter.post("/login", loginUser)

export { usersRouter }