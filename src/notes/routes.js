import express from 'express';
import {
    new_notes,
    get_by_id,
    get_task_notes,
    get_user_notes,
    update_note,
    delete_notes
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js'

const router = express.Router();

router.post('/notes', authenticate, authorize('user'), new_notes);
router.get('/notes/:id', authenticate, authorize('user'), get_by_id);
router.get('/notes/tasks/:id', authenticate, authorize('user'), get_task_notes);
router.get('/notes/user', authenticate, authorize('user'), get_user_notes);
router.put('/notes/:id', authenticate, authorize('user'), update_note);
router.delete('/notes/:id', authenticate, authorize('user'), delete_notes);

export default router;
