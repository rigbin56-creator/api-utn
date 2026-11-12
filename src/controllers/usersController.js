import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { successResponse } from "../utils/index.js"
import dotenv from "dotenv"
dotenv.config()

const getUsers = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

const registerUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Para agregar un usuario necesitas información"})
        }

        const body = req.body
        const { name, email, password } = body

        if (!name || !email || !password) {
            return res.status(400).json({ error: "Todos los datos son requeridos"})
        }

        const foundUser = await User.findOne({ email })

        if (foundUser) {
            return res.status(409).json({ error: "Este correo ya se encuentra en uso"})
        }

        const passwordEncryptred = await bcrypt.hash(password, 10)

        //  OK
        const newUser = await User.create({ 
            name, 
            email, 
            password: passwordEncryptred
        })

        res.json(successResponse(newUser, "Usuario creado exitosamente"))
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor"})
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "El correo y la contraseña son obligatorios"})
        }

        //  validación de datos
        if (!email.endsWith("@gmail.com")) {
            return res.status(400).json({ error: "El correo solo es valido con gmail"})
        }
    
        const foundUser = await User.findOne({ email }) 

        if (!foundUser) {
            return res.status(401).json({ error: "Credenciales invalidas"})
        }

        const passwordValited = await bcrypt.compare(password, foundUser.password)

        if (!passwordValited) {
            return res.status(401).json({ error: "Credenciales invalidas"})
        }

        const token = jwt.sign({ name: foundUser.name }, "contraseñasupersecreta", { expiresIn: "180h"})

        res.json(successResponse(token, "Login exitoso!"))
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor"})
    }
}

export { getUsers, registerUser, loginUser }