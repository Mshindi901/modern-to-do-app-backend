import express from 'express';
import {
    new_task,
    get_completed_task,
    get_task_by_user,
    get_task_by_project,
    get_task_by_priority,
    get_starred_tasks,
    update_task_completion,
    update_task_info,
    update_task_priority,
    star_task,
    delete_tasks
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.post('/task/user', authenticate, authorize('user'), new_task);
router.get('/task/user', authenticate, authorize('user'), get_task_by_user);
router.get('/task/project/:id', authenticate, authorize('user'), get_task_by_project);
router.post('/task/priority', authenticate, authorize('user'), get_task_by_priority);
router.get('/task/starred', authenticate, authorize('user'), get_starred_tasks);
router.get('/task/completed', authenticate, authorize('user'), get_completed_task);
router.put('/task/complete/:id', authenticate, authorize('user'), update_task_completion);
router.put('/task/starred/:id', authenticate, authorize('user'), star_task);
router.put('/task/:id', authenticate, authorize('user'), update_task_info);
router.put('/task/priority', authenticate, authorize('user'), update_task_priority);
router.delete('/task/id', authenticate, authorize('user'), delete_tasks);

export default router;