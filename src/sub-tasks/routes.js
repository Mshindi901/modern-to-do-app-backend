import express from 'express';
import {
    new_sub_task,
    get_completed_sub_task,
    get_sub_task_by_task,
    update_sub_task,
    delete_sub_track
} from'./controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.post('/sub-task', authenticate, authorize('user'), new_sub_task);
router.get('/sub-task/task/:id', authenticate, authorize('user'), get_sub_task_by_task);
router.get('/sub-task/task/completed/:id', authenticate, authorize('user'), get_completed_sub_task);
router.put('/sub-task/:id', authenticate, authorize('user'), update_sub_task);
router.delete('/sub-task/:id', authenticate, authorize('user'), delete_sub_track);

export default router;