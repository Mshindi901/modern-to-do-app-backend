import expres from 'express';
import {
    add_task_assignee,
    get_member_assigned_tasks,
    get_task_assignees,
    remove_task_assignee
} from './controller.js';
import {authenticate, authorize} from '../../middleware/auth.js';

const router = expres.Router();

router.post('/task-assignees', authenticate, authorize('user'), add_task_assignee);
router.get('/task-assignees/member/:id', authenticate, authorize('user'), get_member_assigned_tasks);
router.get('/task-assignees/task/:id', authenticate, authorize('user'), get_task_assignees);
router.delete('/task-assignees/:task_id/:member_id', authenticate, authorize('user'), remove_task_assignee);

export default router;