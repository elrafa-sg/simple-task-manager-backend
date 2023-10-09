import Tarefa from '../../models/tarefa'

import { sequelize, Sequelize } from '../../models'
import { GoogleCalendar } from '../helpers/google-calendar'

export class TarefaController {
    public async listarTarefas (req: any, res: any) {
        try {
            const tarefaDao = Tarefa(sequelize)
            const { dataInicial, dataFinal, prioridade } = req.query

            let listaTarefas

            if (dataInicial && dataFinal) {
                listaTarefas = await tarefaDao.findAll({
                    where:
                    {
                        idUsuario: req.body.idUsuario,
                        vencimento: {
                            [Sequelize.Op.between]: [new Date(dataInicial), new Date(dataFinal)]
                        }
                    }
                })
            }
            else {
                listaTarefas = await tarefaDao.findAll({
                    where:
                    {
                        idUsuario: req.body.idUsuario,
                    }
                })
            }

            if (listaTarefas) {
                // filtrar prioridade
                listaTarefas = listaTarefas
                    .filter(tarefa => prioridade == '' || tarefa.dataValues.prioridade == prioridade)

                res.status(200).json(listaTarefas)
            }
            else {
                res.status(400).json({ message: 'Erro ao obter lista de tarefas!' })
            }
        } catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async cadastrarTarefa (req: any, res: any) {
        try {
            const tarefaDao = Tarefa(sequelize)
            const googleCalendar = new GoogleCalendar(req.body.googleCalendarToken)

            const tarefa = tarefaDao.build({
                ...req.body.tarefa,
                idUsuario: req.body.idUsuario
            })
            const novaTarefa = await tarefa.save()
            if (novaTarefa) {
                try {
                    await googleCalendar.criarCalendario()
                    const idCalendario = await googleCalendar.obterIdCalendario()

                    if (idCalendario) {
                        const eventoInserido = await googleCalendar.inserirEventoNoCalendario(idCalendario, {
                            titulo: novaTarefa.dataValues.titulo,
                            descricao: novaTarefa.dataValues.descricao,
                            vencimento: novaTarefa.dataValues.vencimento
                        })

                        if (eventoInserido) {
                            const tarefaAtualizada = await tarefa.update({
                                googleCalendarEventId: eventoInserido?.data.id
                            })

                            if (tarefaAtualizada) {
                                res.status(200).json({ message: 'Tarefa criada com sucesso!' })
                            }
                        }
                    }
                } catch (error) {
                    novaTarefa.destroy()
                    res.status(400).json({ message: 'Erro ao criar a tarefa!' })
                }
            }
        } catch (error: any) {
            console.warn('erro', error)
            res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async atualizarTarefa (req: any, res: any) {
        try {
            const tarefaDao = Tarefa(sequelize)
            const googleCalendar = new GoogleCalendar(req.body.googleCalendarToken)

            const tarefa = await tarefaDao.findByPk(req.body.tarefa.id)
                .catch(() => { return res.status(404).json({ message: 'Tarefa não encontrada!' }) })

            if (tarefa.idUsuario != req.body.idUsuario) {
                return res.status(403).json({ message: 'Você não pode alterar esta tarefa!' })
            }

            const oldValues = { ...tarefa?.dataValues }
            if (tarefa) {
                const novaTarefa: any = await tarefa?.update({
                    titulo: req.body.tarefa.titulo,
                    descricao: req.body.tarefa.descricao,
                    vencimento: req.body.tarefa.vencimento,
                    prioridade: req.body.tarefa.prioridade
                })

                if (novaTarefa) {
                    try {
                        const idCalendario = await googleCalendar.obterIdCalendario()
                        const idEvento = novaTarefa.dataValues.googleCalendarEventId

                        const eventoAtualizado = await
                            googleCalendar.atualizarEventoNoCalendario(idCalendario, idEvento, {
                                titulo: novaTarefa.dataValues.titulo,
                                descricao: novaTarefa.dataValues.descricao,
                                vencimento: novaTarefa.dataValues.vencimento
                            })

                        if (eventoAtualizado) {
                            return res.status(200).json({ message: 'Tarefa atualizada com sucesso!' })
                        }
                    }
                    catch (error) {
                        // volta ao valor original
                        novaTarefa.update({
                            titulo: oldValues.titulo,
                            descricao: oldValues.descricao,
                            prioridade: oldValues.prioridade,
                            vencimento: oldValues.vencimento
                        })
                        res.status(400).json({ message: 'Erro ao atualizar a tarefa!' })
                    }
                }
            }
        }
        catch (error: any) {
            console.warn('erro', error)
            res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async deletarTarefa (req: any, res: any) {
        try {
            const tarefaDao = Tarefa(sequelize)
            const googleCalendar = new GoogleCalendar(req.body.googleCalendarToken)

            const tarefa: any = await tarefaDao.findByPk(req.body.tarefa.id)
                .catch(() => { return res.status(404).json({ message: 'Tarefa não encontrada!' }) })

            if (tarefa.idUsuario != req.body.idUsuario) {
                return res.status(403).json({ message: 'Você não pode deletar esta tarefa!' })
            }

            if (tarefa) {
                const idCalendario = await googleCalendar.obterIdCalendario()
                const idEvento = tarefa.dataValues.googleCalendarEventId
                const eventoExcluido = await
                    googleCalendar.excluirEventoNoCalendario(idCalendario, idEvento)

                if (eventoExcluido) {
                    const tarefaDeletada: any = await tarefa?.destroy()
                    if (tarefaDeletada) {
                        res.status(200).json({ message: 'Tarefa deletada com sucesso!' })
                    }
                    else {
                        res.status(400).json({ message: 'Erro ao deletar a tarefa!' })
                    }
                }
            }
        } catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }
}
