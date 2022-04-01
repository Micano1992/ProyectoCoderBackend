const express = require('express');
const { ENV: { PORT } } = require('../config');
const apiRoutes = require('../routes/index');

const app = express()

//Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes

app.use('/api', apiRoutes)
app.get('/*', (req, res) => res.status(400).json({ succes: false, error: `Ruta ${req.url} en método ${req.method} no implementada` }));


const connectedServer = app.listen(PORT, () => { console.log(`Server conectado con puerto ${PORT}`) })

connectedServer.on('error', (error) => { console.log(error.message) })


