import Usuario from '../../models/usuario'

import { generateTokens, } from '../helpers/auth'

import { sequelize } from '../../models'

export class UsuarioController {
    public async login (req: any, res: any) {
        const { email, senha } = req.body

        const usuarioDao = Usuario(sequelize)

        try {
            const usuario = await usuarioDao.findOne({
                where: {
                    email: email,
                    senha: senha
                }
            })

            if (usuario == null) {
                return res.status(404).json('Usuário ou senha inválidos!')
            }

            return res.status(200).json({
                access_token: generateTokens({
                    id: usuario?.dataValues.id
                })
            })
        } catch (error: any) {
            return res.status(500).json(error)
        }
    }
}

