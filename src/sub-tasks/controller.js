import Sub_Tasks from "./schema.js";

export const new_sub_task = async(req, res) => {
    try {
        const {team_id, task_id, title, is_completed} = req.body;
        if(!task_id ||!title){
            return res.status(400).json({success: false, message: 'Provide Valid info'});
        };
        const newSubTask = await Sub_Tasks.create({team_id, task_id, title, is_completed});
        if(!newSubTask){
            return res.status(404).json({success: false, message: 'failed to create'});
        };
        return res.status(201).json({success: true, message: 'Sub Task created'})
    } catch (error) {
        console.error(`Error with new sub task creation ${error}`);
        return res.status(500).json({success: false, message: 'internal server Error'});
    }
};

export const get_sub_task_by_task = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide Task Id'})
        };
        const sub_tasks = await Sub_Tasks.findAll({where:{task_id: id}});
        if(!sub_tasks || sub_tasks.length == 0){
            return res.status(404).json({success: false, message: 'No sub tasks Fetched'});
        };
        return res.status(200).json({success: true, message: 'Sub Tasks Fetched', data: sub_tasks})
    } catch (error) {
        console.error(`Error with getting sub tasks by task id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    };
}
export const get_completed_sub_task = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide task id'});
        };
        const sub_tasks = await Sub_Tasks.findAll({where:{task_id: id, is_completed: true}});
        if(!sub_tasks || sub_tasks.length == 0){
            return res.status(404).json({success: false, message: 'No sub tasks Fetched'});
        };
        return res.status(200).json({success: true, message: 'Sub tasks fetched', data: sub_tasks})
    } catch (error) {
        console.error(`Error with getting completed sub tasks for a specific task ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const update_sub_task = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide sub_task id'});
        };
        const {task_id, title, is_completed} = req.body;
        const sub_task = await Sub_Tasks.findByPk(id);
        if(!sub_task){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_sub_task = await sub_task.update({task_id, title, is_completed});
        if(!update_sub_task){
            return res.status(404).json({success: false, message: 'failed to update'});
        };
        return res.status(200).json({success: true, message: 'Sub Task updated'})
    } catch (error) {
        console.error(`Error with updating sub-task record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const delete_sub_track = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide sub_task id'});
        };
        const sub_task = await Sub_Tasks.findByPk(id);
        if(!sub_task){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        await sub_task.destroy();
        return res.status(200).json({success: true, message: 'Deleted sub track record'})
    } catch (error) {
        console.error(`Error with deleting a sub track by record id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};