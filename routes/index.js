const express = require('express')

const productosRoutes = require('./productos/productos.routes')
const carritoRoutes = require('./carrito/carrito.routes')
const { route } = require('./carrito/carrito.routes')

const router = express.Router()

//Middleware



//Routes
router.use('/productos', productosRoutes)
router.use('/carrito', carritoRoutes)
router.get('/*', (req, res) => res.status(400).json({ succes: false, error: `Ruta ${req.url} en método ${req.method} no autorizada` }));

module.exports = router;