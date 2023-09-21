import express from 'express'
import { UsuarioController } from '../controllers/usuario-controller'

const app = express.Router()

const usuario = new UsuarioController()

app.post('/login', usuario.login)
app.post('/signup', usuario.signup)

export default app
