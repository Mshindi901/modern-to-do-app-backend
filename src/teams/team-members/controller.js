import TeamMembers from "./schema.js";

export const new_team_member = async(req, res) => {
    try {
        const owner = req.user.id
        const {user_id, team_id, role} = req.body;
        if(!user_id || !team_id || !role){
            return res.status(400).json({success: false, message: 'Provide Full info'});
        };
        const is_owner = await TeamMembers.findOne({where:{user_id: owner, team_id: team_id}})
        if(is_owner.role !== 'owner' || 'admin'){
            return res.status(400).json({success: false, message: 'Only Team owners and admins can create teams'})
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
        const {team_id} = req.id;
        if(!team_id || !user_id){
            return res.status(400).json({success: false, message: 'Provide team id and be authetucated'});
        };
        const members = await TeamMembers.findAll({where:{team_id: team_id}});
        if(!members || members.length === 0){
            return res.status(404).json({success:false, message: 'No members found'});
        };
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
        const owner = req.user.id
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const {role} = req.body;
        const is_owner = await TeamMembers.findOne({where: {user_id: owner, id: id}});
        if(is_owner !== 'owner' || 'admin'){
            return res.status(400).json({success: false, message: 'Only admins and owners can update role'})
        }
        const member = await TeamMembers.findByPk(id);
        if(!member){
            return res.status(404).json({success: false, message: 'Invalid ID'})
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
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const member = await TeamMembers.findByPk(id);
        if(!member){
            return res.status(404).json({success: false, message: 'Invalid ID'})
        };
        await member.destroy();
        return res.status(200).json({success: true, message: 'Member Deleted'})
    } catch (error) {
        console.error(`Error with deleting member record from team ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};