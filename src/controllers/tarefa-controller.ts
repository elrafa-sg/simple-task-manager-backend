import Tarefa from '../../models/tarefa'

import { sequelize } from '../../models'

export class TarefaController {
    public listarTarefas (req: any, res: any) {

        const tarefaDao = Tarefa(sequelize)

        try {
            tarefaDao.findAll()
                .then(listaTarefas => res.status(200).json(listaTarefas))
                .catch(() => res.status(400).json({ message: 'Erro ao obter lista de tarefas!' }))


        } catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public cadastrarTarefa (req: any, res: any) {
        try {
            const tarefaDao = Tarefa(sequelize)

            const tarefa = tarefaDao.build(req.body)
            tarefa.save()
                .then(novaTarefa => res.status(200).json(novaTarefa))
                .catch(() => res.status(400).json({ message: 'Erro ao criar a tarefa!' }))
        } catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public atualizarTarefa (req: any, res: any) {
        try {
            const tarefaDao = Tarefa(sequelize)

            tarefaDao.findByPk(req.body.id)
                .then(tarefa => {

                    if (!tarefa) {
                        res.status(404).json({ message: 'Tarefa não encontrada!' })
                    }

                    tarefa?.update({
                        titulo: req.body.titulo,
                        descricao: req.body.descricao,
                        vencimento: req.body.vencimento,
                        prioridade: req.body.prioridade
                    })
                        .then(novaTarefa => res.status(200).json(novaTarefa))
                        .catch(() => res.status(400).json({ message: 'Erro ao atualizar a tarefa! Verifique o preenchimento dos campos.' }))
                })
        } catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public deletarTarefa (req: any, res: any) {
        try {
            const tarefaDao = Tarefa(sequelize)

            tarefaDao.findByPk(req.body.idTarefa)
                .then(tarefa => {

                    if (!tarefa) {
                        res.status(404).json({ message: 'Tarefa não encontrada!' })
                    };

                    tarefa?.destroy()
                        .then(tarefaDeletada => res.status(200).json(tarefaDeletada))
                        .catch(() => res.status(400).json({ message: 'Erro ao deletar a tarefa!' }))

                })
        } catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }
}

