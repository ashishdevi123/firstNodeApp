const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

router.get('/shop', productsController.getShopData);

router.post('/shop', productsController.postShopData);

router.get('/edit-product/:productId', productsController.getEditProduct);
router.post('/edit-product', productsController.postEditProduct);
module.exports = router;
