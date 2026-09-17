import Tags from "./tag-schema.js";
import Tag_Tasks from "./tag-task-schema.js";

export const new_tag = async(req, res) => {
    try {
        const {name, color} = req.body;
        const user_id = req.user.id;
        if(!name || !user_id){
            return res.status(400).json({success: false, message: 'Please be authenticated, provide name'})
        };
        const newtag = await Tags.create({user_id, name, color});
        if(!newtag){
            return res.status(404).json({success: false, message: 'failed to create new tag'});
        };
        return res.status(201).json({success: true, message: 'Tag Created'})
    } catch (error) {
        console.error(`Error with creating a new tag record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_user_tags = async(req, res) => {
    try {
        const id = req.user.id;
        if(!id){
            return res.status(404).json({success: false, message: 'please be authenticated, login again'});
        };
        const tags = await Tags.findAll({where: {user_id: id}});
        if(!tags || tags.length == 0){
            return res.status(404).json({success: false, message: 'No tags fetched'})
        };
        return res.status(200).json({success: true, message: 'tags fetched', data: tags})
    } catch (error) {
        console.error(`Error with getting a users tags ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const update_tag = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide tag record id'});
        };
        const {name, color} = req.body;
        const tag = await Tags.findByPk(id);
        if(!tag){
            return res.status(404).json({success: false, message: 'inavlid ID'});
        };
        const updated_tag = await tag.update({name, color});
        if(!updated_tag){
            return res.status(404).json({success: false, message: 'failed to update tag'})
        };
        return res.status(200).json({success: true, message: 'tag record updated'})
    } catch (error) {
        console.error(`Error with updating tag info ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const delete_tag = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide tag record id'});
        };
        const tag = await Tags.findByPk(id);
        if(!tag){
            return res.status(404).json({success: false, message: 'inavlid ID'});
        };
        await tag.destroy();
        return res.status(200).json({success: true, message: 'Record deleted'})
    } catch (error) {
        console.error(`Error with deleting a tag by record id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const add_tag_to_task = async(req, res) => {
    try {
        const {task_id, tag_id} = req.body;
        if(!task_id || !tag_id){
            return res.status(404).json({success: false, message: 'Provide Full info'});
        };
        const is_tag = await Tags.findByPk(tag_id);
        if(!is_tag){
            return res.status(404).json({success: false, message: 'Invalid tag id'});
        };
        const relationship = await Tag_Tasks.create({task_id, tag_id});
        if(!relationship){
            return res.status(404).json({success: false, message: 'Failed to add new relationship'});
        };
        return res.status(201).json({success: true, message: 'New Tag relationship added'});
    } catch (error) {
        console.error(`Error joining task to a tag ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_task_tag = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide a task record id'});
        };
        const tag = await Tag_Tasks.findOne({where: {task_id: id}});
        if(!tag){
            return res.status(404).json({success: false, message: 'No tags fetched'})
        };
        return res.status(200).json({success: true, message: 'Fetched Tag', data: tag})
    } catch (error) {
        console.error(`Error with getting the tag for a task ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

