import {Router} from 'express';
const router=Router();

import uploadRouter from './uploadRouter'
import sliderRouter from './sliderRouter';
import categoryRouter from './categoryRouter'
import subcategoryRouter from './subCategoryRouter'
import brandRouter from './brandRouter'
import productRouter from './productRouter'
import orderRouter from './orderRouter'
import settingsRouter from './settingsRouter'
import userRouter from './userRouter'
import dashboardRouter from './dashboardRouter'

router.use(uploadRouter)
router.use(sliderRouter)
router.use(categoryRouter)
router.use(subcategoryRouter)
router.use(brandRouter)
router.use(productRouter)
router.use(orderRouter)
router.use(settingsRouter)
router.use(userRouter)
router.use(dashboardRouter)


export default router;