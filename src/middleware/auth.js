const { tokenVerify } = require('../config/jwt')

const isAuth = async (req, res, next) => {
    const [ type, hash ] = req.headers.authorization.split(' ')
    try {
        const token = await tokenVerify(hash)
        next()
    } catch (error) {
        res.status(400).send({ 'err': error })
    }
}

module.exports = isAuth