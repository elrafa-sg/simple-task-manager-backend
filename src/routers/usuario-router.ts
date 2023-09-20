import express from 'express'
import { UsuarioController } from '../controllers/usuario-controller'

const app = express.Router()

const usuario = new UsuarioController()

app.post('/login', usuario.login)


export default app
