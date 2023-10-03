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
            const googleCalendar = new GoogleCalendar(req.body.googleCalendarToken)

            tarefaDao.findByPk(req.body.tarefa.id)
                .then(tarefa => {
                    if (!tarefa) {
                        res.status(404).json({ message: 'Tarefa não encontrada!' })
                    }

                    tarefa?.update({
                        titulo: req.body.tarefa.titulo,
                        descricao: req.body.tarefa.descricao,
                        vencimento: req.body.tarefa.vencimento,
                        prioridade: req.body.tarefa.prioridade
                    })
                        .then(async (novaTarefa) => {

                            await googleCalendar.criarCalendario()
                            const idCalendario = await googleCalendar.obterIdCalendario()
                            const idEvento = '3urisaf5uhmmfji8ot2utd288k'
                            googleCalendar.atualizarEventoNoCalendario(idCalendario, idEvento, {
                                titulo: novaTarefa.dataValues.titulo,
                                descricao: novaTarefa.dataValues.descricao,
                                vencimento: novaTarefa.dataValues.vencimento
                            })
                                .then(() => {
                                    res.status(200).json({ message: 'Tarefa atualizada com sucesso!' })
                                })
                                .catch(() => {
                                    novaTarefa.destroy()
                                    res.status(400).json({ message: 'Erro ao atualizar a tarefa! Verifique o preenchimento dos campos.' })
                                })
                        })
                        .catch(() => {
                            res.status(400).json({ message: 'Erro ao atualizar a tarefa! Verifique o preenchimento dos campos.' })
                        })
                })
        }
        catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public deletarTarefa (req: any, res: any) {
        try {
            const tarefaDao = Tarefa(sequelize)
            const googleCalendar = new GoogleCalendar(req.body.googleCalendarToken)

            tarefaDao.findByPk(req.body.tarefa.id)
                .then(tarefa => {

                    if (!tarefa) {
                        res.status(404).json({ message: 'Tarefa não encontrada!' })
                    };

                    tarefa?.destroy()
                        .then(async () => {
                            await googleCalendar.criarCalendario()
                            const idCalendario = await googleCalendar.obterIdCalendario()
                            const idEvento = '3urisaf5uhmmfji8ot2utd288k'
                            googleCalendar.excluirEventoNoCalendario(idCalendario, idEvento)
                                .then(() => {
                                    res.status(200).json({ message: 'Tarefa deletada com sucesso!' })
                                })
                                .catch(() => {
                                    res.status(400).json({ message: 'Erro ao deletar a tarefa!' })
                                })
                        })
                        .catch(() => res.status(400).json({ message: 'Erro ao deletar a tarefa!' }))
                })
        } catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }
}

