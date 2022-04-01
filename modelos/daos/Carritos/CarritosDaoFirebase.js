const ContenedorFirebase = require('../../contenedores/contenedorFirebase')

class DaoCarritoFirebase extends ContenedorFirebase {
    constructor() {
        super('carritos')
    }
}

module.exports = DaoCarritoFirebase