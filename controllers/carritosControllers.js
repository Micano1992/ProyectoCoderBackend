const { carritoDao } = require('../modelos/daos/index');

const carritosDao = new carritoDao();

const getAllCarts = async (req, res, next) => {
    try {
        const carritos = await carritosDao.getAll();
        res.json({ success: true, carritos });
    }
    catch (error) {
        next(error);
    }
};

const getCartById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const carritos = await carritosDao.getById(id);
        res.json({ success: true, carritos });
    }
    catch (error) {
        next(error);
    }
};

const createCart = async (req, res, next) => {
    try {
        const newCart = await carritosDao.save(req.body);
        res.json({ success: true, result: newCart });
    }
    catch (error) {
        next(error);
    }
};

const updateCartById = async (req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const updatedCart = await carritosDao.updateById(id, body);
        res.json({ success: true, result: updatedCart });
    }
    catch (error) {
        next(error);
    }
};

const deleteCartById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedCart = await carritosDao.deleteById(id);
        res.json({ success: true, result: deletedCart });
    }
    catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCarts,
    getCartById,
    createCart,
    updateCartById,
    deleteCartById,
}