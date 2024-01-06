import {Router} from 'express';
import settingsController from '../../../controllers/admin/settingsController';
const router = Router();

router.get('/settings',settingsController.getSettings);
router.patch('/settings/:id',settingsController.updateSettings);

export default router;