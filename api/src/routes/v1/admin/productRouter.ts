import {Router} from 'express';
import productController from '../../../controllers/admin/productController'
import {validate} from '../../../middlewares/index'
import adminValidator from '../../../middlewares/validator/adminValidators';
const router = Router();

router.get("/products",productController.getProducts)


router.post("/product",adminValidator.addProductValidator,validate,productController.addProduct)

router.patch("/product/:id",adminValidator.addCategoryValidator,validate,productController.updateProduct)

router.delete("/product/:id",productController.deleteProduct)

export default router;