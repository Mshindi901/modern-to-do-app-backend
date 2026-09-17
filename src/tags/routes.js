import express from 'express';
import {
    new_tag,
    get_task_tag,
    get_user_tags,
    update_tag, 
    delete_tag,
    add_tag_to_task
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.post('/tags/user', authenticate, authorize('user'),  new_tag);
router.post('/tags/task', authenticate, authorize('user'), add_tag_to_task);
router.get('/tasks/user', authenticate, authorize('user'), get_user_tags);
router.get('/tag/task/:id', authenticate, authorize('user'), get_task_tag);
router.put('/tags/:id', authenticate, authorize('user'), update_tag);
router.delete('/tags/:id', authenticate, authorize('user'), delete_tag);

export default router;