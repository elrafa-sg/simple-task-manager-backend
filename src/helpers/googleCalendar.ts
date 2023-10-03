import { auth, calendar, calendar_v3 } from '@googleapis/calendar'
import {
    GOOGLE_CALENDAR_CLIENT_ID,
    GOOGLE_CALENDAR_CLIENT_SECRET,
    GOOGLE_CALENDAR_REDIRECT_URL,
    DEFAULT_CALENDAR_NAME
} from '../config'

const googleAuth = new auth.OAuth2(
    GOOGLE_CALENDAR_CLIENT_ID,
    GOOGLE_CALENDAR_CLIENT_SECRET,
    GOOGLE_CALENDAR_REDIRECT_URL
)

interface DataGoogleCalendar {
    dateTime: string,
    timeZone: string
}

class EventoGoogleCalendar {
    summary: string
    description: string
    start: DataGoogleCalendar
    end: DataGoogleCalendar
    reminders: any

    constructor(titulo: string, descricao: string, dataVencimento: string) {
        this.summary = titulo
        this.description = descricao
        this.start = { dateTime: dataVencimento, timeZone: 'America/Sao_Paulo' }
        this.end = { dateTime: dataVencimento, timeZone: 'America/Sao_Paulo' }
        this.reminders = {
            useDefault: false,
            overrides: [{ method: 'email', minutes: 1 }]
        }
    }
}

class GoogleCalendar {
    private googleCalendar: calendar_v3.Calendar

    constructor(googleCalendarToken: string) {
        googleAuth.setCredentials({ access_token: googleCalendarToken })
        this.googleCalendar = calendar({ version: 'v3', auth: googleAuth })
    }

    async obterIdCalendario (nomeCalendario = DEFAULT_CALENDAR_NAME) {
        let idCalendario = ''

        const listaCalendarios = await this.googleCalendar.calendarList.list()
        if (listaCalendarios) {
            const calendarioEncontrado = listaCalendarios.data.items?.filter(calendario =>
                calendario.summary == nomeCalendario)[0]

            if (calendarioEncontrado) {
                idCalendario = calendarioEncontrado.id!
            }
        }

        return idCalendario
    }

    async criarCalendario (nomeCalendario = DEFAULT_CALENDAR_NAME) {
        this.obterIdCalendario()
            .then(idCalendario => {
                if (!idCalendario) {
                    this.googleCalendar.calendars.insert(
                        { requestBody: { summary: nomeCalendario } }
                    )
                        .then(calendarInsertResponse => {
                            return calendarInsertResponse
                        })
                        .catch(calendarErrorResonse => {
                            console.log('erro', calendarErrorResonse)
                            return calendarErrorResonse
                        })
                }
            })
    }

    async inserirEventoNoCalendario (
        idCalendario: string,
        dadosEvento: { titulo: string, descricao: string, vencimento: string }
    ) {
        const evento = new EventoGoogleCalendar(dadosEvento.titulo, dadosEvento.descricao, dadosEvento.vencimento)
        this.googleCalendar.events.insert(
            {
                calendarId: idCalendario,
                requestBody: evento,
                sendUpdates: 'all'
            }
        )
            .then(eventoInserido => eventoInserido)
            .catch(erroGoogleInsert => erroGoogleInsert)
    }

    async atualizarEventoNoCalendario (
        idCalendario: string, idEvento: string,
        dadosEvento: { titulo: string, descricao: string, vencimento: string }
    ) {

        const novoEvento = new EventoGoogleCalendar(dadosEvento.titulo, dadosEvento.descricao, dadosEvento.vencimento)
        this.googleCalendar.events.update(
            {
                calendarId: idCalendario,
                eventId: idEvento,
                requestBody: novoEvento
            })
            .then(eventoAtualizado => eventoAtualizado)
            .catch(erroAtualizarEvento => erroAtualizarEvento)
    }

    async excluirEventoNoCalendario (idCalendario: string, idEvento: string) {
        this.googleCalendar.events.delete({ calendarId: idCalendario, eventId: idEvento })
            .then(deleteResponse => deleteResponse)
            .catch(errorResponse => errorResponse)
    }
}

export { GoogleCalendar }
