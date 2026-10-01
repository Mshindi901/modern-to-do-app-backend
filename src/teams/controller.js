import Teams from "./schema.js";
import TeamMembers from "./team-members/schema.js";

export const new_team = async(req, res) => {
    try {
        const {name, description} = req.body;
        const user_id = req.user.id
        if(!name || !user_id){
            return res.status(400).json({success: false, message: 'Provide team name and be authenticated'});
        };
        const newTeam = await Teams.create({user_id, name, description});
        if(!newTeam){
            return res.status(404).json({success: false, message: 'Failed to create a team'});
        };
        const team_owner = await TeamMembers.create({team_id: newTeam.id, user_id: user_id, role: 'owner', joined_at: new Date()})
        return res.status(201).json({success: true, message: 'Team Created and added team owner'});
    } catch (error) {
        console.error(`Error with creating a new team record`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_teams_by_user = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please be authenticated'});
        };
        const teams = await Teams.findAll({where: {user_id: user_id}});
        if(!teams){
            return res.status(404).json({success: false, message: 'No Teams Fetched'})
        };
        return res.status(200).json({success: true, message: 'Teams Fetched', data: teams})
    } catch (error) {
        console.error(`Error with getting team by owner id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};
 
export const get_team_by_id = async(req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.user.id;
        if(!id || !user_id){
            return res.status(400).json({success: false, message: 'Provide team id and authenticate'});
        };
        const membership = await TeamMembers.findOne({where: {team_id: id, user_id}});
        if(!membership){
            return res.status(403).json({success: false, message: 'You are not a member of this team'});
        };
        const team = await Teams.findByPk(id);
        if(!team){
            return res.status(404).json({success: false, message: 'Team not found'});
        };
        return res.status(200).json({success: true, message: 'Team fetched', data: team});
    } catch (error) {
        console.error(`Error with getting team by id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const update_team = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const {name, description} = req.body;
        const team = await Teams.findByPk(id);
        if(!team){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        if(team.user_id !== req.user.id){
            return res.status(403).json({success: false, message: 'Only the team owner can update this team'});
        };
        const updated_team = await team.update({name, description});
        if(!updated_team){
            return res.status(404).json({success: false, message: 'Failed to update team'})
        }
        return res.status(200).json({success: true, message: 'updated record'});
    } catch (error) {
        console.error(`Error with updating a team record by id ${error}`);
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
};

export const delete_team = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const team = await Teams.findByPk(id);
        if(!team){
            return res.status(404).json({success: false, message: 'Invalid ID'});
        };
        await team.destroy();
        return res.status(200).json({success: true, message: 'Team deleted'})
    } catch (error) {
        console.error(`Error with deleting team ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};