import Usuario from '../../models/usuario'

import { generateTokens, } from '../helpers/auth'

import { sequelize } from '../../models'

export class UsuarioController {
    public login (req: any, res: any) {
        const { email, senha } = req.body

        const usuarioDao = Usuario(sequelize)

        try {
            usuarioDao.findOne({
                where: {
                    email: email,
                    senha: senha
                }
            })
                .then(usuario => {
                    if (usuario == null) {
                        return res.status(404).json({ message: 'Usuário ou senha inválidos!' })
                    }

                    return res.status(200).json({
                        access_token: generateTokens({
                            id: usuario?.dataValues.id
                        })
                    })
                })
        } catch (error: any) {
            console.warn('erro', error)
            return res.status(500).json({ message: 'Ocorreu um erro ao processar sua requisição. Tente novamente mais tarde!' })
        }
    }

    public async signup (req: any, res: any) {
        const { nome, senha, email } = req.body

        const usuarioDao = Usuario(sequelize)

        try {
            const usuario = await usuarioDao.create({
                nome: nome,
                email: email,
                senha: senha
            })
            usuario.dataValues.senha = null

            return res.status(200).json(usuario)
        } catch (error: any) {
            return res.status(500).json(error)
        }
    }
}

