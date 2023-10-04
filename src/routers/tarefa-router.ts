import express from 'express'
import { TarefaController } from '../controllers/tarefa-controller'

import { authMiddleware } from '../middlewares/auth-middleware'

const app = express.Router()

const tarefa = new TarefaController()

app.get('/', authMiddleware, tarefa.listarTarefas
    /*
        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/ListaTarefas' }
        }

        #swagger.responses[400] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[403] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }

    */
)
app.post('/', authMiddleware, tarefa.cadastrarTarefa
    /* 
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/TarefaCriar' }
        }

        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[400] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[403] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)
app.put('/', authMiddleware, tarefa.atualizarTarefa
    /* 
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/TarefaAtualizar' }
        }

        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[400] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[403] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[404] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)
app.delete('/', authMiddleware, tarefa.deletarTarefa
    /* 
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: { $ref: '#/definitions/TarefaDeletar' }
        }

        #swagger.responses[200] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[401] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[403] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[404] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
        #swagger.responses[500] = {
            schema: { $ref: '#/definitions/RespostaPadrao' }
        }
    */
)

export default app
