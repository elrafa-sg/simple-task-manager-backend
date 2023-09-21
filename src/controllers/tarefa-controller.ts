import Tarefa from '../../models/tarefa'

import { generateTokens, } from '../helpers/auth'

import { sequelize } from '../../models'

export class TarefaController {
    public async listarTarefas (req: any, res: any) {

        const tarefaDao = Tarefa(sequelize)

        try {
            const listaTarefas = await tarefaDao.findAll()

            return res.status(200).json(listaTarefas)

        } catch (error: any) {
            return res.status(500).json(error)
        }
    }
}

