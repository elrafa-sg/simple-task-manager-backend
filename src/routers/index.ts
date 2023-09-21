import express from 'express'

import usuarioRoutes from './usuario-router'
import tarefaRoutes from './tarefa-router'

const router = express.Router()

router.use('/usuario', usuarioRoutes)
router.use('/tarefa', tarefaRoutes)

export default router