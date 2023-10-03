import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ACCESS_SECRET } from '../config'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.status(401)
    }

    jwt.verify(token, ACCESS_SECRET, (err: any, decoded: any) => {
        if (err) {
            return res.status(403)
        }

        req.body.idUsuario = decoded.id
        next()
    })
}
