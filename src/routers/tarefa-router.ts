import express from 'express'
import { TarefaController } from '../controllers/tarefa-controller'

import { authMiddleware } from '../middlewares/auth-middleware'

const app = express.Router()

const tarefa = new TarefaController()

app.get('/', authMiddleware, tarefa.listarTarefas)
app.post('/', authMiddleware, tarefa.cadastrarTarefa)
app.put('/', authMiddleware, tarefa.atualizarTarefa)
app.delete('/', authMiddleware, tarefa.deletarTarefa)

export default app
