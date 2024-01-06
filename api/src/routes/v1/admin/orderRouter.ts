import {Router} from 'express'

import orderController from '../../../controllers/admin/orderController'
const router = Router();

router.get('/orders',orderController.getOrders)

router.get('/order/invoice/:id',orderController.getOrderInvoice)

router.patch('/order/:id', orderController.updateOrder)

router.delete('/order/:id', orderController.deleteOrder)

export default router;