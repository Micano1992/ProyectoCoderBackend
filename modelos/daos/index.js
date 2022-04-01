const { ENV: { PERS } } = require('../../config')

let productoDao
let carritoDao

switch (PERS) {
    case 'firebase':
        productoDao = require('./Productos/ProductosDaoFirebase')
        carritoDao = require('./Carritos/CarritosDaoFirebase')
        break;
    case 'mongo':
        productoDao = require('./Productos/ProductosDaoMongoDb')
        carritoDao = require('./Carritos/CarritosDaoMongoDb')
        break;
    case 'archivo':
        productoDao = require('./Productos/ProductosDaoArchivo')
        carritoDao = require('./Carritos/CarritosDaoArchivo')
        break;
    default:
        throw new Error('Metodo de persistencia inválido')
}

module.exports = {
    productoDao,
    carritoDao
}