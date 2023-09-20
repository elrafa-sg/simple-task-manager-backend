import express from 'express'

import usuarioRoutes from './usuario-router'

const router = express.Router()

router.use('/usuario', usuarioRoutes)

export default router