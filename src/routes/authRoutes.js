const {Router} = require('express');
const authController = require('../controllers/authController')
const detailController = require('../controllers/detailController')
const productController = require('../controllers/productController')
const {requireAuth} = require("./middleware/authMiddleware");
const {admin} = require("./middleware/adminMiddleware");
const router = Router();


router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.post('/details', detailController.detail_post);
router.get('/details', detailController.detail_get);
router.post('/product', productController.product_post);
router.get('/product',  productController.product_get_byName);
router.get('/product/all',  productController.product_get_all);
router.delete('/product',  productController.product_delete);

module.exports = router;
