import express from 'express'
import { UsuarioController } from '../controllers/usuario-controller'

const app = express.Router()

const usuario = new UsuarioController()

app.post('/login', usuario.login
    /* 
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/UsuarioLogin' }
        }

        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/UsuarioToken' }
        }
        #swagger.responses[404] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

app.post('/signup', usuario.signup
    /* 
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/UsuarioCriar' }
        }

        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/Usuario' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

export default app
