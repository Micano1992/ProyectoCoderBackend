const { Schema } = require('mongoose')
const contenedorMongo = require('../../contenedores/contenedorMongo')

const collection = 'carritos'

const carritosSchema = new Schema({
    timestamp: { type: Date, min: Date.now() },
    productos: [{ type: Schema.Types.ObjectId, ref: 'productos' }]
})

class CarritosDaoMongo extends contenedorMongo {
    constructor() {
        super(collection, carritosSchema)
    }

}

module.exports = CarritosDaoMongo