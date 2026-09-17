import Tasks from "./schema.js";

export const new_task = async(req, res) => {
    try {
        const {project_id, title, context, due_date, priority, is_completed, is_starred} = req.body
        const user_id = req.user.id;
        if(!user_id || !title || !priority || !is_completed || !is_starred){
            return res.status(400).json({success: false, message: 'Provide all required info'});
        };
        const newTask = await Tasks.create({user_id, project_id, title, context, due_date, priority, is_completed, is_starred});
        if(!newTask){
            return res.status(404).json({success: false, message: 'failed to create new task record'});
        };
        return res.status(201).json({success: true, message: 'Task Added'});
    } catch (error) {
        console.error(`Error with creating a new task record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_task_by_user = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please Authenticate, login'});
        };
        const tasks = await Tasks.findAll({where:{user_id: user_id}});
        if(!tasks || tasks.length == 0){
            return res.status(404).json({success: false, message: 'No Tasks Fetched'});
        };
        return res.status(200).json({success: true, message: 'tasks fetched', data: tasks});
    } catch (error) {
        console.error(`Erro with getting user tasks ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_task_by_project = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const tasks = await Tasks.findAll({project_id: id});
        if(!tasks || tasks.length == 0){
            return res.status(404).json({success: false, message: 'No tasks Fetched'});
        };
        return res.status(200).json({success: true, message: 'Tasks Fetched', data: tasks})
    } catch (error) {
        console.error(`Error with getting task by the project id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_task_by_priority = async(req, res) => {
    try {
        const {priority} = req.body;
        const {user_id} = req.user.id
        if(!priority){
            return res.status(400).json({success: false, message: 'Offer a prioity level'});
        };
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please authenticate, login again'})
        }
        const tasks = await Tasks.findAll({where:{user_id: user_id, priority: priority}});
        if(!tasks || tasks.length == 0){
            return res.status(404).json({success: false, message: 'No Tasks Fetched'});
        };
        return res.status(200).json({success: true, message: 'Tasks Fetched', data: tasks})
    } catch (error) {
        console.error(`Error with getting task by priority status ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const get_completed_task = async(req, res) => {
    try{
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please authenticate, login again'});
        };
        const tasks = await Tasks.findAll({where:{user_id: user_id, is_completed: true}});
        if(!tasks || tasks.length == 0){
            return res.status(404).json({success: false, message: 'No tasks Fetched'});
        };
        return res.status(200).json({success: true, message: 'Tasks Fetched', data: tasks})
    } catch (error) {
        console.error(`Error with getting all user completed tasks ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_starred_tasks = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please authenticate, login again'});
        };
        const tasks = await Tasks.findAll({where:{user_id: user_id, is_starred: true}});
        if(!tasks || tasks.length == 0){
            return res.status(404).json({success: false, message: 'No tasks Fetched'});
        };
        return res.status(200).json({success: true, message: 'Tasks Fetched', data: tasks})
    } catch (error) {
        console.error(`Error with getting all the users starred tasks ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const update_task_priority = async(req, res) => {
    try {
        const {id} = req.params;
        const {priority} = req.body;
        if(!id){
            return res.status(400).json({success: false, message: 'Please provide record id'});
        };
        const task = await Tasks.findByPk(id);
        if(!task){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_task = await task.update({priority: priority});
        if(!updated_task){
            return res.status(404).json({success: false, message: 'Failed to update tasks'});
        };
        return res.status(200).json({success: true, message: 'task updated'})
    } catch (error) {
        console.error(`Error with updating a task record priority ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const update_task_completion = async(req, res) => {
    try {
        const {id} = req.params;
        const {is_completed} = req.body
        if(!id){
            return res.status(400).json({success: false, message: 'Please provide record id'});
        };
        const task = await Tasks.findByPk(id);
        if(!task){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_task = await task.update({is_completed: is_completed});
        if(!updated_task){
            return res.status(404).json({success: false, message: 'Failed to update complete status'});
        };
        return res.status(200).json({success: true, message: 'Updated task'})
    } catch (error) {
        console.error(`Error with updating task to complete ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const star_task = async(req, res) => {
    try {
        const {id} = req.params;
        const {is_starred} = req.body;
        if(!id){
            return res.status(400).json({success: false, message: 'Please provide record id'});
        };
        const task = await Tasks.findByPk(id);
        if(!task){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_task = await task.update({is_starred: is_starred});
        if(!updated_task){
            return res.status(404).json({success: false, message: 'failed to update'});
        };
        return res.status(200).json({success: true, message: 'Updated task'})
    } catch (error) {
        console.error(`Error with updating the task star status ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const update_task_info = async(req, res) => {
    try {
        const {id} = req.params;
        const {project_id, title, context, due_date, } = req.body;
        if(!id){
            return res.status(400).json({success: false, message: 'Please provide record id'});
        };
        const task = await Tasks.findByPk(id);
        if(!task){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_task = await task.update({project_id, title, context, due_date});
        if(!updated_task){
            return res.status(404).json({success: false, message: 'Failed to update'})
        };
        return res.status(200).json({success: true, message: 'Updated Task'})
    } catch (error) {
        console.error(`Error with updating the task info ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const delete_tasks = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Please provide record id'});
        };
        const task = await Tasks.findByPk(id);
        if(!task){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        await task.destroy();
        return res.status(200).json({success: true, message: 'Task deleted'});
    } catch (error) {
        console.error(`Error with deleting the task by id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};
