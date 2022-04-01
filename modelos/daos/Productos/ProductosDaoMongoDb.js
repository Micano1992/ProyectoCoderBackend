const { Schema } = require('mongoose')
const contenedorMongo = require('../../contenedores/contenedorMongo')

const collection = 'productos'

const productosSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    codigo: { type: String, unique: true, required: true },
    imagen: { type: String },
    precio: { type: Number, min: 0, required: true },
    stock: { type: Number, min: 0, required: true },
    timestamp: { type: Date, min: Date.now() }
})

class ProductosDaoMongo extends contenedorMongo {
    constructor() {
        super(collection, productosSchema)
    }

}

module.exports = ProductosDaoMongo