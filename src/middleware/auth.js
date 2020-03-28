const { tokenVerify } = require('../config/jwt')

const isAuthorized = async (req, res, next) => {
    
    if (!req.headers.authorization) {
        res.send({ 'mgs': 'Token de acesso não identificado' })
    }

    const [ type, hash ] = req.headers.authorization.split(' ')

    if (type != 'Bearer') {
        res.status(400).send({ 'mgs': '01 - Token não identificado!' })
    }
    if (!hash) {
        res.status(400).send({ 'mgs': '02 - Token não identificado!' })
    }

    try {
        const token = await tokenVerify(hash)
        if (!token) {
            res.status(400).send({ 'msg': '' })
        }
        next()
    } catch (error) {
        res.status(400).send({ 'err': error })
    }
}

module.exports = isAuthorized