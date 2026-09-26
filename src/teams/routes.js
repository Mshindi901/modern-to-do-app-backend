import express from 'express';
import {
    new_team,
    get_teams_by_user,
    update_team,
    delete_team
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js';

const router = express.Router();

router.post('/team', authenticate, authorize('user'), new_team );
router.get('/team/user', authenticate, authorize('user'), get_teams_by_user);
router.put('/teams/:id', authenticate, authorize('user'), update_team);
router.delete('/teams/:id', authenticate, authorize('user'), delete_team);