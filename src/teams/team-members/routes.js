import express from 'express';
import {
    new_team_member,
    get_members_by_team,
    get_user_teams,
    update_member_role,
    delete_member
} from './controller.js';
import {authenticate, authorize} from '../../middleware/auth.js';

const router = express.Router();

router.post('/team-members', authenticate, authorize('user'), new_team_member);
router.get('/team-members/teams/:id', authenticate, authorize('user'), get_members_by_team);
router.get('/team-members/user', authenticate, authorize('user'), get_user_teams);
router.put('/team-members/:id', authenticate, authorize('user'), update_member_role);
router.delete('/team-members/:id', authenticate, authorize('user'), delete_member);

export default router;