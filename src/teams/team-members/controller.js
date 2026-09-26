import TeamMembers from "./schema.js";

export const new_team_member = async(req, res) => {
    try {
        const actor_id = req.user.id;
        const {user_id, team_id, role} = req.body;
        if(!user_id || !team_id || !['member', 'admin'].includes(role)){
            return res.status(400).json({success: false, message: 'Provide a user, team, and valid member role'});
        };
        const actor = await TeamMembers.findOne({where: {user_id: actor_id, team_id}});
        if(!actor || !['owner', 'admin'].includes(actor.role)){
            return res.status(403).json({success: false, message: 'Only team owners and admins can add members'});
        };
        const existing_member = await TeamMembers.findOne({where: {user_id, team_id}});
        if(existing_member){
            return res.status(409).json({success: false, message: 'This user is already a team member'});
        };
        const new_team = await TeamMembers.create({user_id, team_id, role, joined_at: new Date()});
        if(!new_team){
            return res.status(404).json({success: false, message: 'failed to create team'});
        };
        return res.status(201).json({success: true, message: 'Member added'})
    } catch (error) {
        console.error(`Error with creating a new team member record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_members_by_team = async(req, res) => {
    try {
        const user_id = req.user.id;
        const {id: team_id} = req.params;
        if(!team_id || !user_id){
            return res.status(400).json({success: false, message: 'Provide team id and authenticate'});
        };
        const membership = await TeamMembers.findOne({where: {team_id, user_id}});
        if(!membership){
            return res.status(403).json({success: false, message: 'You are not a member of this team'});
        };
        const members = await TeamMembers.findAll({where:{team_id: team_id}});
        return res.status(200).json({success: true, message: 'Members Fetched', data: members})
    } catch (error) {
        console.error(`Error with getting team members ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_user_teams = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please be authenticated'})
        };
        const teams = await TeamMembers.findAll({where:{user_id: user_id}});
        if(!teams || teams.length === 0){
            return res.status(404).json({success: false, message: 'no teams fetched'})
        };
        return res.status(200).json({success: true, message: 'user teams fetched', data: teams})
    } catch (error) {
        console.error(`Error with getting a user teams ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const update_member_role = async(req, res) => {
    try {
        const actor_id = req.user.id;
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const {role} = req.body;
        if(!['member', 'admin'].includes(role)){
            return res.status(400).json({success: false, message: 'Provide a valid member role'});
        };
        const member = await TeamMembers.findByPk(id);
        if(!member){
            return res.status(404).json({success: false, message: 'Invalid ID'})
        };
        if(member.role === 'owner'){
            return res.status(400).json({success: false, message: 'The team owner role cannot be changed'});
        };
        const actor = await TeamMembers.findOne({where: {user_id: actor_id, team_id: member.team_id}});
        if(!actor || !['owner', 'admin'].includes(actor.role) || (actor.role === 'admin' && member.role === 'admin')){
            return res.status(403).json({success: false, message: 'You do not have permission to change this role'});
        };
        const updated_member = await member.update({role});
        if(!updated_member){
            return res.status(404).json({success: false, message: 'failed to update role'})
        };
        return res.status(200).json({success: true, message: 'member record updated'})
    } catch (error) {
        console.error(`Error with updating member record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const delete_member = async(req, res) => {
    try {
        const actor_id = req.user.id;
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const member = await TeamMembers.findByPk(id);
        if(!member){
            return res.status(404).json({success: false, message: 'Invalid ID'})
        };
        if(member.role === 'owner'){
            return res.status(400).json({success: false, message: 'The team owner cannot be removed'});
        };
        const actor = await TeamMembers.findOne({where: {user_id: actor_id, team_id: member.team_id}});
        if(!actor || (actor_id !== member.user_id && (!['owner', 'admin'].includes(actor.role) || (actor.role === 'admin' && member.role === 'admin')))){
            return res.status(403).json({success: false, message: 'You do not have permission to remove this member'});
        };
        await member.destroy();
        return res.status(200).json({success: true, message: 'Member Deleted'})
    } catch (error) {
        console.error(`Error with deleting member record from team ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};