import express from 'express';
import {
    new_notification,
    get_user_notifications,
    get_user_team_notifications,
    get_user_unread_notifications,
    get_user_team_unread_notifications,
    mark_notification_as_read,
    delete_notification
} from './controller.js';
import {authenticate, authorize} from '../middleware/auth.js';

const router = express.Router();

router.post('/notifications', authenticate, new_notification);
router.get('/notifications', authenticate, authorize('user'), get_user_notifications);
router.get('/notifications/unread', authenticate, authorize('user'), get_user_unread_notifications);
router.get('/notifications/:id', authenticate, authorize('user'), get_user_team_notifications);
router.get('/notifications/:id/unread', authenticate, authorize('user'), get_user_team_unread_notifications);
router.put('/notifications/:id/read', authenticate, authorize('user'), mark_notification_as_read);
router.delete('/notifications/:id', authenticate, authorize('user'), delete_notification);

export default router;