import express from 'express';
import {
    new_project,
    get_all_user_projects,
    update_projects,
    delete_project_id
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.post('/project', authenticate, authorize('user'), new_project);
router.get('/project/user', authenticate, authorize('user'), get_all_user_projects);
router.put('/projects/user/:id', authenticate, authorize('user'), update_projects);
router.delete('/projects/:id', authenticate, authorize('user'), delete_project_id);

export default router;