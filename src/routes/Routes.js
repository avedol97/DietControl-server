const {Router} = require('express');
const authController = require('../controllers/userController')
const detailController = require('../controllers/detailController')
const productController = require('../controllers/productController')
const balanceController = require('../controllers/balanceController')
const {requireAuth} = require("./middleware/userMiddleware");
const {admin} = require("./middleware/adminMiddleware");
const router = Router();


router.post('/guest/signup', authController.signup_post);
router.post('/guest/login', authController.login_post);
router.get('/user/logout', authController.logout_get);
router.get('/admin/user', authController.logout_get);


router.post('/user/details',requireAuth, detailController.detail_post);
router.get('/user/details',requireAuth, detailController.detail_get);

router.post('/user/product',requireAuth, productController.product_create_post);
router.get('/user/product',requireAuth,  productController.product_getByName);
router.get('/user/product/all',requireAuth,  productController.product_getAll);

router.delete('/admin/product',requireAuth,admin,  productController.product_delete);

router.post('/user/balance',requireAuth, balanceController.balance_create_post);
router.get('/user/balance',requireAuth, balanceController.balance_getAll);

module.exports = router;
