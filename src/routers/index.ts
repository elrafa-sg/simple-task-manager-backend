import express from 'express'

import usuarioRoutes from './usuario-router'
import tarefaRoutes from './tarefa-router'

const router = express.Router()

router.use('/usuario', usuarioRoutes
    //  #swagger.tags = ['Usuario'] 
)
router.use('/tarefa', tarefaRoutes
    //  #swagger.tags = ['Tarefa'] 
)

export default router