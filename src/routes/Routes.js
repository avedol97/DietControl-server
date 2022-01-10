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

router.put('/user/update/details', userController.userUpdateDetail_put);
router.put('/user/update/admin', userController.userUpdateAdmin_put);
router.put('/user/update/active', userController.userUpdateActive_put);

router.post('/details', detailController.detail_post);
router.get('/details', detailController.detail_get);

router.post('/product', productController.product_create_post);
router.get('/products/all' , productController.product_getAll);

router.delete('/product',requireAuth,admin,  productController.product_delete);

router.post('/balance', balanceController.balance_create_post);
router.get('/balance', balanceController.balance_getAll);

module.exports = router;
