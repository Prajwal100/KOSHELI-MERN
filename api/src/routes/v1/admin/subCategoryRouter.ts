import {Router} from 'express';
import subCategoryController from '../../../controllers/admin/subCategoryController';
import {validate} from '../../../middlewares/index'
import adminValidator from '../../../middlewares/validator/adminValidators';
const router = Router();

router.get("/subcategories",subCategoryController.getSubCategories);

router.get("/subcategories-of-category/:id",subCategoryController.getSubCategoriesOfCategory);

router.post("/subcategory",adminValidator.addSubCategoryValidator,validate,subCategoryController.addSubCategory);

router.patch("/subcategory/:id",adminValidator.addSubCategoryValidator,validate,subCategoryController.updateSubcategory);

router.delete("/subcategory/:id",subCategoryController.deleteSubcategory);

export default router;