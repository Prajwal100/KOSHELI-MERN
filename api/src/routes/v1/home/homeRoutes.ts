import { Router } from "express";
import homeController from "../../../controllers/home/homeController";
const router = Router();

router.get("/sliders", homeController.getSliders);

router.get("/categories", homeController.getCategories);

router.get("/category/:id",homeController.getCategoryByID)


router.get("/brands", homeController.getBrands);

router.get('/top-products', homeController.getTopProducts);

router.get("/general-settings", homeController.generalSettings);

router.get("/product/:id",homeController.getProductDetails)

router.get("/product-by-category/:id",homeController.getProductsByCatId)



export default router;
