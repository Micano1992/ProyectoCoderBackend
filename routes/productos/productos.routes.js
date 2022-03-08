const express = require('express');
const fs = require('fs');

const router = express.Router();

const contenedorProducto = require('../../data/contenedorProducto')

const productosFunciones = new contenedorProducto('data/productos.txt')

let ultimoId = 1

router.get('/:id', (req, res) => {

    const { id } = req.params

    productosFunciones.getAll()
        .then((resultado) => { res.json({ buscada: resultado.find(producto => producto.id == id) }) })

})

router.post('/', (req, res) => {

    const { nombre, descripcion, codigo, url, precio, stock, isAdmin } = req.body

    if (!nombre || !descripcion || !codigo || !url || !precio || !stock) {
        return res.status(400).json({ succes: false, error: 'Error en carga de datos' });
    }

    if (!isAdmin) {
        return res.status(420).json({ succes: false, error: 'Ruta /productos en método POST no autorizada' });
    }

    productosFunciones.save({ nombre: nombre, descripcion: descripcion, codigo: codigo, url: url, precio: precio, stock: stock })

    res.json({
        nuevoProducto: { id: productosFunciones.obtenerUltimoId, nombre: nombre, descripcion: descripcion, codigo: codigo, url: url, precio: precio, stock: stock }
    })

})

router.put('/:id', (req, res) => {

    const { id } = req.params;
    const proActualizar = req.body;

    if (!proActualizar) {
        return res.status(400).json({ succes: false, error: 'Error en carga de datos' });
    }

    if (!proActualizar.isAdmin) {
        return res.status(420).json({ succes: false, error: 'Ruta /productos en método PUT no autorizada' });
    }

    productosFunciones.getById(id)
        .then((resultado) => {
            if (!resultado) { res.json({ error: "Producto no encontrado" }) }
            else {

                if (proActualizar.descripcion) { resultado.descripcion = proActualizar.descripcion }
                if (proActualizar.precio) { resultado.precio = proActualizar.precio }
                if (proActualizar.stock) { resultado.stock = proActualizar.stock }
                if (proActualizar.codigo) { resultado.codigo = proActualizar.codigo }
                if (proActualizar.url) { resultado.url = proActualizar.url }

                productosFunciones.update(resultado)
                    .then(res.json({ proActualizar }))

            }

        })

})

router.delete('/:id', (req, res) => {

    const { id } = req.params
    const infoBody = req.body;

    if (!infoBody) {
        return res.status(400).json({ succes: false, error: 'Error en carga de datos' });
    }

    if (!infoBody.isAdmin) {
        return res.status(420).json({ succes: false, error: 'Ruta /productos en método DELETE no autorizada' });
    }

    productosFunciones.getById(id)
        .then((resultado) => {
            if (!resultado) { res.json({ error: "Producto no encontrado" }) }
            else {
                productosFunciones.deleteById(id)

                res.json({ respuesta: "Se elimino el producto" })
            }
        })
}
)

module.exports = router