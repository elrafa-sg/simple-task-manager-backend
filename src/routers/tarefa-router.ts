import express from 'express'
import { TarefaController } from '../controllers/tarefa-controller'

const app = express.Router()

const tarefa = new TarefaController()

app.get('/', tarefa.listarTarefas)

export default app
