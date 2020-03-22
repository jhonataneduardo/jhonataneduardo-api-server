require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const configEnv = require('./config/env')
const userRoutes = require('./routes/user')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// routes api
app.use('/api/user', userRoutes)

app.listen(configEnv.app.port, (err) => {
    if (err) {
        return console.log(err)
    } else {
        console.log('Start!!')
    }
})
