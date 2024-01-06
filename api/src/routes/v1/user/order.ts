import {Router} from "express";
import userOrderController from "../../../controllers/user/userOrderController"
const router= Router();

router.get("/orders",userOrderController.getMyOrder);

router.post("/order/place",userOrderController.placeOrder);


export default router;