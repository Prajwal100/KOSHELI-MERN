import {Router} from 'express';
import categoryController from '../../../controllers/admin/categoryController';
import adminValidator from '../../../middlewares/validator/adminValidators';
import {validate} from '../../../middlewares/index'
const router = Router();

router.get("/categories",categoryController.getCategories);
router.post("/category", adminValidator.addCategoryValidator,validate,categoryController.addCategory);
router.patch("/category/:id", adminValidator.addCategoryValidator,validate,categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);
export default router;