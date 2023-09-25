import express from 'express'
import cors from 'cors'
import router from './routers'

const app = express()

app.use(cors({
    origin: '*',
    methods: ['*']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

export default app
