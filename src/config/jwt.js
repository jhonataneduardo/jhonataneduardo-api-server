const jwt = require('jsonwebtoken')

const secret = process.env.SECRET_KEY || 'SECRET_KEY'

const tokenSign = (params = {}) => {
    return jwt.sign(params, secret, { expiresIn: '1d' })
}

const tokenVerify = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    tokenSign,
    tokenVerify
}

