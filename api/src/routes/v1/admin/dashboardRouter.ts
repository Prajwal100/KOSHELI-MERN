import {Router} from 'express';
import dashboardController from '../../../controllers/admin/dashboardController'
const router= Router();

router.get('/get-dashboard-widgets',dashboardController.getDashboardWidget)

// Related to Charts in Dashboard;
router.get("/get-user-reports",dashboardController.getUserReportByMonth)

router.get("/get-order-reports",dashboardController.getOrderReportByMonth)


export default router;