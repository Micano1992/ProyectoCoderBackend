const express = require('express');
const fs = require('fs');

const router = express.Router();

const contenedorCarrito = require('../../data/contenedorCarrito')
const contenedorProducto = require('../../data/contenedorProducto')

const carritoFunciones = new contenedorCarrito('data/carritos.txt')
const productosFunciones = new contenedorProducto('data/productos.txt')

let ultimoId = 1


router.get('/:id/productos', (req, res) => {

    const { id } = req.params

    carritoFunciones.getById(id)
        .then((resultado) => {
            console.log(resultado.productos)

            res.json({ productos: resultado.productos })

        })
})

router.post('/', (req, res) => {

    let nuevoCarrito

    carritoFunciones.save()
        .then((respuesta) => {
            nuevoCarrito = respuesta.id
            res.json({ id: nuevoCarrito })
        })

})

router.delete('/:id', (req, res) => {

    const { id } = req.params
    const infoBody = req.body;

    carritoFunciones.getById(id)
        .then((resultado) => {
            if (!resultado) { res.json({ error: "Carrito no encontrado" }) }
            else {
                carritoFunciones.deleteById(id)

                res.json({ respuesta: "Se elimino el producto" })
            }
        })
}
)

router.post('/:id/productos', (req, res) => {

    const { id } = req.params;
    const prodNuevo = req.body;

    if (!prodNuevo.idProducto) {
        return res.status(401).json({ succes: false, error: 'Error en carga de datos' });
    }

    carritoFunciones.getById(id)
        .then((resultadoCarrito) => {
            if (!resultadoCarrito) { return res.status(401).json({ succes: false, error: 'El id de carrito no existe' }); }
            productosFunciones.getById(prodNuevo.idProducto)
                .then((resultadoProducto => {
                    if (!resultadoProducto) { return res.status(401).json({ succes: false, error: "Producto no encontrado" }) }

                    if (resultadoCarrito.productos.find(prod => prod.id == resultadoProducto.id)) {

                        const carritoFiltrado = resultadoCarrito.productos.filter(prod => prod.id != resultadoProducto.id)

                        console.log(carritoFiltrado)

                        resultadoCarrito.productos = carritoFiltrado

                        resultadoCarrito.productos.push(resultadoProducto)

                        console.log(resultadoCarrito)

                        carritoFunciones.update(resultadoCarrito)
                            .then(res.json({ respuesta: 'Se agrego el producto' }))

                    }
                    else {
                        resultadoCarrito.productos.push(resultadoProducto)

                        carritoFunciones.update(resultadoCarrito)
                            .then(res.json({ respuesta: 'Se agrego el producto' }))
                    }
                }
                ))
        })
})

router.delete('/:id/productos/:idProd', (req, res) => {

    const { id, idProd } = req.params;

    if (isNaN(id) || isNaN(idProd)) {
        return res.status(401).json({ succes: false, error: 'Error en carga de datos' });
    }

    carritoFunciones.getById(id)
        .then((resultadoCarrito) => {
            if (!resultadoCarrito) { return res.status(401).json({ succes: false, error: 'El id de carrito no existe' }); }
            productosFunciones.getById(idProd)
                .then((resultadoProducto => {
                    if (!resultadoProducto) { return res.status(401).json({ succes: false, error: "Producto no encontrado" }) }

                    if (!resultadoCarrito.productos.find(prod => prod.id == resultadoProducto.id)) { return res.status(401).json({ succes: false, error: "Producto no encontrado en carrito" }) }

                    const carritoFiltrado = resultadoCarrito.productos.filter(prod => prod.id != resultadoProducto.id)

                    console.log(carritoFiltrado)

                    resultadoCarrito.productos = carritoFiltrado

                    console.log(resultadoCarrito)

                    carritoFunciones.update(resultadoCarrito)
                        .then(res.json({ respuesta: 'Se eliminó el producto' }))

                }
                ))
        })
})


module.exports = router