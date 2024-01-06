import { Router } from "express";
import sliderController from "../../../controllers/admin/sliderController";
import adminValidator from '../../../middlewares/validator/adminValidators'
import {validate} from "../../../middlewares/index";
const sliderRouter = Router();

sliderRouter.get("/sliders", sliderController.getAllSliders);
sliderRouter.post("/slider",adminValidator.addSliderValidator,validate, sliderController.addSlider);
sliderRouter.patch("/slider/:id",adminValidator.addSliderValidator,validate,sliderController.updateSlider);
sliderRouter.delete("/slider/:id",sliderController.deleteSlider);

export default sliderRouter;
