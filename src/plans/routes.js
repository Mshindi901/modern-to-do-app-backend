import express from 'express';
import {
    new_plan,
    get_plan_by_id,
    get_task_plans,
    get_user_plans,
    update_plan,
    delete_plan
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js';

const router = express.Router();

router.post('/plans', authenticate, authorize('user'), new_plan);
router.get('/plans/user', authenticate, authorize('user'), get_user_plans);
router.get('/plans/task/:id', authenticate, authorize('user'), get_task_plans);
router.get('/plans/:id', authenticate, authorize('user'), get_plan_by_id);
router.put('/plans/:id', authenticate, authorize('user'), update_plan);
router.delete('/plans/:id', authenticate, authorize('user'), delete_plan);

export default router;