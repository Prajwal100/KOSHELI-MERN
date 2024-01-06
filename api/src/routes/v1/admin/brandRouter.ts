import {Router} from 'express';
import brandController from '../../../controllers/admin/brandController'
import adminValidator from '../../../middlewares/validator/adminValidators';
import {validate} from '../../../middlewares/index'
const router = Router();

router.get("/brands",brandController.getBrands);

router.post("/brand",adminValidator.addBrandValidator,validate,brandController.addBrand);

router.patch("/brand/:id",adminValidator.addBrandValidator,validate,brandController.updateBrand);

router.delete("/brand/:id",brandController.deleteBrand)

export default router;