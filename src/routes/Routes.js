const {Router} = require('express');
const userController = require('../controllers/userController')
const detailController = require('../controllers/detailController')
const productController = require('../controllers/productController')
const balanceController = require('../controllers/balanceController')
const {requireAuth} = require("./middleware/userMiddleware");
const {admin} = require("./middleware/adminMiddleware");
const router = Router();


router.post('/guest/signup', userController.signup_post);
router.post('/guest/login', userController.login_post);
router.get('/user/logout', userController.logout_get);
router.get('/user', userController.user_get);
router.post('/user/update/details', userController.userUpdateDetail_post);
router.post('/user/update/admin', userController.userUpdateAdmin_post);
router.post('/user/update/active', userController.userUpdateActive_post);

router.get('/admin/user', userController.logout_get);


router.post('/user/details',requireAuth, detailController.detail_post);
router.get('/user/details',requireAuth, detailController.detail_get);

router.post('/user/product',requireAuth, productController.product_create_post);
router.get('/user/product',requireAuth,  productController.product_getByName);
router.get('/user/product/all',requireAuth,  productController.product_getAll);

router.delete('/admin/product',requireAuth,admin,  productController.product_delete);

router.post('/user/balance',requireAuth, balanceController.balance_create_post);
router.get('/user/balance',requireAuth, balanceController.balance_getAll);

module.exports = router;
