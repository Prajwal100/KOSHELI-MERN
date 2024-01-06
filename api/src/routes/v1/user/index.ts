import {Router} from 'express'
import orderRouter from './order'
const router= Router();

router.use(orderRouter);

export default router;