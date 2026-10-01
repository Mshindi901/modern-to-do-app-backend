import Notification from "./schema.js";
import TeamMember from "../teams/team-members/schema.js";
import {socketServer} from '../../index.js';

export const new_notification = async (req, res) => {
    try {
        const {user_id, team_id, title, message, entity_id, entity_type} = req.body;
        if(!user_id || !title || !message || !entity_id || !entity_type) {
            return res.status(400).json({success: false, message: 'Missing required fields'});
        };
        const newNotification = await Notification.create({user_id, team_id, title, message, entity_id, entity_type});
        if(!newNotification) {
            return res.status(500).json({success: false, message: 'Failed to create notification'});
        };
        socketServer.to(`user_${user_id}`).emit('new_notification', newNotification);
        return res.status(201).json({success: true, message: 'Notification created successfully'});
    } catch (error) {
        console.log(`Error with creating a new notification record ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const get_user_notifications = async (req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id) {
            return res.status(400).json({success: false, message: 'Please be authenticated'});
        };
        const notifications = await Notification.findAll({where: {user_id}});
        if(!notifications || notifications.length === 0) {
            return res.status(404).json({success: false, message: 'No notifications found'});
        };
        return res.status(200).json({success: true, message: 'Notifications fetched successfully', data: notifications});
    } catch (error) {
        console.log(`Error with fetching user notifications ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const get_user_team_notifications = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {id} = req.params;
        if(!user_id || !id) {
            return res.status(400).json({success: false, message: 'Provide team record id and be authenticated'});
        };
        const teamMember = await TeamMember.findOne({where: {user_id, team_id: id}});
        if(!teamMember) {
            return res.status(403).json({success: false, message: 'You are not a member of this team'});
        };
        const notifications = await Notification.findAll({where: {user_id, team_id: id}});
        if(!notifications || notifications.length === 0) {
            return res.status(404).json({success: false, message: 'No notifications found for this team'});
        };
        return res.status(200).json({success: true, message: 'Team notifications fetched successfully', data: notifications});
    } catch(error) {
        console.log(`Error with fetching user team notifications ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const get_user_unread_notifications = async (req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id) {
            return res.status(400).json({success: false, message: 'Please be authenticated'});
        };
        const notifications = await Notification.findAll({where: {user_id, is_read: false}});
        if(!notifications || notifications.length === 0) {
            return res.status(404).json({success: false, message: 'No unread notifications found'});
        };
        return res.status(200).json({success: true, message: 'Unread notifications fetched successfully', data: notifications});
    } catch(error) {
        console.log(`Error with fetching user unread notifications ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const get_user_team_unread_notifications = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {id} = req.params;
        if(!user_id || !id) {
            return res.status(400).json({success: false, message: 'Provide team record id and be authenticated'});
        };
        const teamMember = await TeamMember.findOne({where: {user_id, team_id: id}});
        if(!teamMember) {
            return res.status(403).json({success: false, message: 'You are not a member of this team'});
        };
        const notifications = await Notification.findAll({where: {user_id, team_id: id, is_read: false}});
        if(!notifications || notifications.length === 0) {
            return res.status(404).json({success: false, message: 'No unread notifications found for this team'});
        };
        return res.status(200).json({success: true, message: 'Unread team notifications fetched successfully', data: notifications});
    } catch(error) {
        console.log(`Error with fetching user team unread notifications ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const mark_notification_as_read = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {id} = req.params;
        if(!user_id || !id) {
            return res.status(400).json({success: false, message: 'Provide notification record id and be authenticated'});
        };
        const notification = await Notification.findOne({where: {id, user_id}});
        if(!notification) {
            return res.status(404).json({success: false, message: 'Notification not found'});
        };
        notification.is_read = true;
        await notification.save();
        return res.status(200).json({success: true, message: 'Notification marked as read successfully'});
    } catch (error) {
        console.log(`Error with marking notification as read ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    };
};

export const delete_notification = async (req, res) => {
    try {
        const user_id = req.user.id;
        const {id} = req.params;
        if(!user_id || !id) {
            return res.status(400).json({success: false, message: 'Provide notification record id and be authenticated'});
        };
        const notification = await Notification.findOne({where: {id, user_id}});
        if(!notification) {
            return res.status(404).json({success: false, message: 'Notification not found'});
        };
        await notification.destroy();
        return res.status(200).json({success: true, message: 'Notification deleted successfully'});
    } catch (error) {
        console.log(`Error with deleting notification ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    };
};
