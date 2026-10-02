import TaskAssignee from "./schema.js";
import TeamMembers from '../team-members/schema.js';

export const add_task_assignee = async (req, res) => {
    try {
        const { task_id, member_id} = req.body;
        const user_id = req.user.id;
        if(!task_id || !member_id || !user_id) {
            return res.status(400).json({success: false, message: 'Provide all fields and be authenticated'});
        };
        const is_member = await TeamMembers.findOne({where: {id: member_id}});
        if(!is_member) {
            return res.status(404).json({success: false, message: 'Member not found'});
        };
        const new_assignee = await TaskAssignee.create({
            task_id,
            member_id,
            assigned_by: user_id,
            assigned_at: new Date()
        });
        if(!new_assignee) {
            return res.status(404).json({success: false, message: 'Failed to add task assignee'});
        };
        return res.status(201).json({success: true, message: 'Task assignee added successfully', data: new_assignee});
    } catch (error) {
        console.error(`Error adding task assignee: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const get_member_assigned_tasks = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({success: false, message: 'Provide member id'});
        };
        const is_member = await TeamMembers.findOne({where: {id: id}});
        if(!is_member) {
            return res.status(404).json({success: false, message: 'Member not found'});
        };
        const assigned_tasks = await TaskAssignee.findAll({where: {member_id: id}});
        if(!assigned_tasks || assigned_tasks.length === 0) {
            return res.status(404).json({success: false, message: 'No tasks assigned to this member'});
        };
        return res.status(200).json({success: true, message: 'fetched successfully', data: assigned_tasks});
    } catch (error) {
        console.error(`Error fetching member assigned tasks: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const get_task_assignees = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(400).json({success: false, message: 'Provide task id'});
        };
        const assigned_members = await TaskAssignee.findAll({where: {task_id: id}});
        if(!assigned_members || assigned_members.length === 0) {
            return res.status(404).json({success: false, message: 'No members assigned to this task'});
        };
        return res.status(200).json({success: true, message: 'fetched successfully', data: assigned_members});
    } catch (error) {
        console.error(`Error fetching task assignees: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const remove_task_assignee = async (req, res) => {
    try {
        const { task_id, member_id } = req.params;
        if(!task_id || !member_id) {
            return res.status(400).json({success: false, message: 'Provide both task id and member id'});
        };
        const assignee = await TaskAssignee.findOne({where: {task_id, member_id}});
        if(!assignee) {
            return res.status(404).json({success: false, message: 'Task assignee not found'});
        };
        await assignee.destroy();
        return res.status(200).json({success: true, message: 'Task assignee removed successfully'});
    } catch (error) {
        console.error(`Error removing task assignee: ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};