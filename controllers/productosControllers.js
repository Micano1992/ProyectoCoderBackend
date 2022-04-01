const { productoDao } = require('../modelos/daos/index');

const productsDao = new productoDao();

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productsDao.getAll();
        res.json({ success: true, products });
    }
    catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productsDao.getById(id);
        res.json({ success: true, product });
    }
    catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {

        const { nombre, descripcion, codigo, url, precio, stock, isAdmin } = req.body

        if (!nombre || !descripcion || !codigo || !url || !precio || !stock) {
            return res.status(400).json({ succes: false, error: 'Error en carga de datos' });
        }

        if (!isAdmin) {
            return res.status(420).json({ succes: false, error: 'Ruta /productos en método POST no autorizada' });
        }

        const newProduct = await productsDao.save(req.body);
        res.json({ success: true, result: newProduct });
    }
    catch (error) {
        next(error);
    }
};

const updateProductById = async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const { id } = req.params;
        const proActualizar = req.body;

        if (!proActualizar) {
            return res.status(400).json({ succes: false, error: 'Error en carga de datos' });
        }

        if (!proActualizar.isAdmin) {
            return res.status(420).json({ succes: false, error: 'Ruta /productos en método PUT no autorizada' });
        }

        const updatedProduct = await productsDao.updateById(id, body);
        res.json({ success: true, result: updatedProduct });
    }
    catch (error) {
        next(error);
    }
};

const deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const { id } = req.params
        const infoBody = req.body;

        if (!infoBody) {
            return res.status(400).json({ succes: false, error: 'Error en carga de datos' });
        }

        if (!infoBody.isAdmin) {
            return res.status(420).json({ succes: false, error: 'Ruta /productos en método DELETE no autorizada' });
        }

        const deletedProduct = await productsDao.deleteById(id);
        res.json({ success: true, result: deletedProduct });
    }
    catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
}