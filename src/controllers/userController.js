const bcrypt = require('bcrypt')

const User = require('../models/user')
const { tokenSign, tokenVerify } = require('../config/jwt')

const UserController = {

    async me(req, res) {
        const [ type, hash ] = req.headers.authorization.split(' ')
        const data = await tokenVerify(hash)
        res.send({ 'user': data.user.id, 'name': data.user.name })
    },

    async register(req, res) {
        try {
            // TODO: add validação caso o usuário/e-mail já exista

            const user = await User.create(req.body)
            user.password = undefined
            console.log(user)
            const token = tokenSign({'user': {'id': user._id, 'name': user.name}})
            return res.send({ user, token })
        } catch (err) {
            return res.status(400).send({ 'error': err})
        }
    },

    async login(req, res) {
        const [ type, hash ] = req.headers.authorization.split(' ')

        if (!type === 'Basic') {
            return res.status(400).send({'err': 'Not Basic Authorization'})
        }

        const [ email, password ] = Buffer.from(hash, 'base64').toString().split(':')

        const userExist = await User.findOne({ email }).select('+password')
        if (!userExist) {
            return res.status(400).send({ 'error': 'User not found' })
        }

        const userAuth = await bcrypt.compare(password, userExist.password)
        if (!userAuth) {
            return res.status(400).send({'error': 'Invalid password :('})
        }
        const token = tokenSign({'user': {'id': userExist._id, 'name': userExist.name}})
        return res.send({ userAuth, token })
    },
    
    async list(req, res) {
        try {
            const users = await User.find()
            return res.send({ users })
        } catch (err) {
            return res.status(400).send({ 'error': err})
        }
    }
}

module.exports = UserController
