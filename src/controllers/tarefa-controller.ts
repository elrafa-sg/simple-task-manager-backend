import Tarefa from '../../models/tarefa'

import { sequelize } from '../../models'
import { GoogleCalendar } from '../helpers/googleCalendar'

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
            const googleCalendar = new GoogleCalendar(req.body.googleCalendarToken)

            const tarefa = tarefaDao.build(req.body.tarefa)
            tarefa.save()
                .then(async novaTarefa => {
                    await googleCalendar.criarCalendario()
                    const idCalendario = await googleCalendar.obterIdCalendario()
                    googleCalendar.inserirEventoNoCalendario(idCalendario, {
                        titulo: novaTarefa.dataValues.titulo,
                        descricao: novaTarefa.dataValues.descricao,
                        vencimento: novaTarefa.dataValues.vencimento
                    })
                        .then((eventoInserido) => {
                            // todo - inserir id do evento na tabela de tarefas
                            //eventoInserido.data.id
                            res.status(200).json({ message: 'Tarefa criada com sucesso!' })
                        })
                        .catch(() => {
                            novaTarefa.destroy()
                            res.status(400).json({ message: 'Erro ao criar a tarefa!' })
                        })
                })
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

