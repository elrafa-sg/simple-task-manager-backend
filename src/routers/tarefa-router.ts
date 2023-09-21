import express from 'express'
import { TarefaController } from '../controllers/tarefa-controller'

const app = express.Router()

const tarefa = new TarefaController()

app.get('/', tarefa.listarTarefas)
app.post('/', tarefa.cadastrarTarefa)
app.put('/', tarefa.atualizarTarefa)
app.delete('/', tarefa.deletarTarefa)

export default app
