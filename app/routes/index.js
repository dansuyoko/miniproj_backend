const express = require('express');
const productRoute = require('../controllers/product.controller');
const merchantRoute = require('../controllers/merchant.controller');
const loginRoute = require('../controllers/login.controller');

const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ massage: 'Hello World!' });
});

router.post('/login', loginRoute.login);

router.get('/product', authMiddleware.isAuthenticate, productRoute.listProduct);
router.get('/productactive', authMiddleware.isAuthenticate, productRoute.listProductActive);
router.post('/product', authMiddleware.isAuthenticate, productRoute.insertProduct);
router.put('/product/:id', authMiddleware.isAuthenticate, productRoute.updateProduct);
router.delete('/product/:id', authMiddleware.isAuthenticate, productRoute.deleteProduct);
router.get('/merchant', authMiddleware.isAuthenticate, merchantRoute.listMerchant);
router.get('/merchantactive', authMiddleware.isAuthenticate, merchantRoute.listMerchantActive);
router.post('/merchant', authMiddleware.isAuthenticate, merchantRoute.insertMerchant);
router.put('/merchant/:id', authMiddleware.isAuthenticate, merchantRoute.updateMerchant);
router.delete('/merchant/:id', authMiddleware.isAuthenticate, merchantRoute.deleteMerchant);

module.exports = router;
