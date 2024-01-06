import {Router} from 'express';

import userController from '../../../controllers/admin/userController'

const router= Router();

router.get('/users',userController.getUsers);

router.patch('/user/:id',userController.updateUser);

router.delete('/user/:id',userController.deleteUser);

export default router;