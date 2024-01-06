import {Router} from 'express';
import authController from '../../../controllers/authController';
import validator from '../../../middlewares/validator/authValidator'
import {validate} from '../../../middlewares/index';
import auth from '../../../middlewares/auth'
const router=Router();

router.post("/login",validator.loginValidator,validate,authController.login);

router.post("/register",validator.registerValidator,validate,authController.register)

router.get("/profile",auth.verifyToken,authController.profile);

router.patch("/profile/:id",authController.profileUpdate)

router.post("/change-password",authController.changePassword)

export default router;