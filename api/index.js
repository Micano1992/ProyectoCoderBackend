const express = require('express');
const apiRoutes = require('../routes/index');

const PORT = process.env.PORT || 8080

const app = express()

//Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes

app.use('/api', apiRoutes)

const connectedServer = app.listen(PORT, () => { console.log(`Server conectado con puerto ${PORT}`) })

connectedServer.on('error', (error) => { console.log(error.message) })


