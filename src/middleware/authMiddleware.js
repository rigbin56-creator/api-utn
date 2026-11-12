import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const authMiddleware = (req, res, next) => {
    try {
        const header = req.headers.authorization

        if (!header) {
            return res.status(401).json({ error: "Token requerido"})
        }

        const token = header.split(" ")[1]

        if (!token) {
            return res.status(401).json({ error: "Formato de token invalido"})
        }

        const isValid = jwt.verify(token, process.env.JWT_SECRET)

        if (!isValid) {
             return res.status(401).json({ error: "Formato de token invalido"})
        }

       next()
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({ error: "Formato de token invalido" })
        }
        if (error.message === "TokenExpiredError") {
            return res.status(401).json({ error: "Token vencido"})
        }
    }
}

export { authMiddleware }