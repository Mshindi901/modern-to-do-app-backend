import Notes from "./schema.js";

export const new_notes = async(req, res) => {
    try {
        const {title, context, task_id, team_id} = req.body;
        const user_id = req.user.id;
        if(!title || !task_id || !user_id){
            return res.status(400).json({success: false, message: 'Provide Full info and be authenticated, please login'})
        };
        const newNote = await Notes.create({task_id, user_id, title, context, team_id});
        if(!newNote){
            return res.status(404).json({success: false, message: 'Failed to create new note'});
        };
        return res.status(201).json({success: true, message: 'Note created'});
    } catch (error) {
        console.error(`Error with creating a new note record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_task_notes = async(req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.user.id;
        if(!user_id || !id){
            return res.status(400).json({success: false, message: 'Provide Task record id and be authenticated, please login'});
        };
        const notes = await Notes.findAll({where:{user_id: user_id, task_id: id}});
        if(!notes || notes.length === 0){
            return res.status(404).json({success: false, message: 'No notes Fetched'})
        };
        return res.status(200).json({success: true, message: 'notes fetched', data: notes})
    } catch (error) {
        console.error(`Error with getting notes by tasks ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_user_notes = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'authenticated route, please login'});
        };
        const notes = await Notes.findAll({where:{user_id: user_id}});
        if(!notes || notes.length === 0){
            return res.status(404).json({success: false, message: 'No notes fetched'});
        };
        return res.status(200).json({success: true, message: 'Notes fetched', data: notes})
    } catch (error) {
        console.error(`Error with getting notes belonging to user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_by_id = async(req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.user.id;
        if(!id || !user_id){
            return res.status(400).json({success: false, message: 'Provide record id and be authenticated, please login'});
        };
        const note = await Notes.findOne({where:{id: id, user_id: user_id}});
        if(!note){
            return res.status(404).json({success: false, message: 'No note Fetched'});
        };
        return res.status(200).json({success: true, message: 'Note fetched', data: note})
    } catch (error) {
        console.error(`Error with getting note by record id ${error}`);
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
};

export const update_note = async(req, res) => {
    try {
        const {id} = req.params;
        const {title, context} = req.body;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide note record id'});
        };
        const note  = await Notes.findByPk(id);
        if(!note){
            return res.status(404).json({success: false, message: 'Invalid record id'});
        };
        const updated_note = await note.update({title, context});
        if(!updated_note){
            return res.status(404).json({success: false, message: 'failed to update note'})
        };
        return res.status(200).json({success: false, message: 'Note updated'})
    } catch (error) {
        console.error(`Error with updating note record by Id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const delete_notes = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide note record id'});
        };
        const note  = await Notes.findByPk(id);
        if(!note){
            return res.status(404).json({success: false, message: 'Invalid record id'});
        };
        await note.destroy();
        return res.status(200).json({success: true, message: 'note deleted'})
    } catch (error) {
        console.error(`Error with deleting note by record id ${error}`);
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
};