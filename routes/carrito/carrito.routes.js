const { Router } = require('express');
const {
    getAllCarts,
    getCartById,
    createCart,
    updateCartById,
    deleteCartById,
} = require('../../controllers/carritosControllers');

const router = Router();

router.get('/', getAllCarts);

router.get('/:id', getCartById);

router.post('/', createCart);

router.put('/', updateCartById);

router.delete('/', deleteCartById);

module.exports = router;