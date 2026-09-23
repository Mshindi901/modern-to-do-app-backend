import Plans from "./schema.js";

export const new_plan = async(req, res) => {
    try {
        const {task_id, title, description, start_at, end_at} = req.body;
        const user_id = req.user.id;
        if(!task_id || !user_id || !title || !start_at || !end_at){
            return res.status(400).json({success: false, message: 'Provide full info and be authenticated, please login'});
        };
        const newPlan = await Plans.create({task_id, user_id, title, description, start_at, end_at});
        if(!newPlan){
            return res.status(404).json({success: false, message: 'Failed to create new plan'})
        };
        return res.status(201).json({success: true, message: 'Plan created'})
    } catch (error) {
        console.error(`Error with creating a new plan record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    };
};

export const get_task_plans = async(req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.user.id;
        if(!id || !user_id){
            return res.status(400).json({success: false, message: 'Provide task id and be authenticated, please login'});
        };
        const plans = await Plans.findAll({where:{task_id: id, user_id: user_id}});
        if(!plans || plans.length === 0){
            return res.status(404).json({success: false, message: 'No plans fetched'});
        };
        return res.status(200).json({success: true, message: 'Plans Fetched', data: plans})
    } catch (error) {
        console.error(`Error with getting plans by tasks ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_user_plans = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'please authenticate, login'});
        };
        const plans = await Plans.findAll({where:{user_id: user_id}});
        if(!plans || plans.length === 0){
            return res.status(404).json({success: false, message: 'No plans fetched'})
        };
        return res.status(200).json({success: true, message: 'plans fetched', data: plans})
    } catch (error) {
        console.error(`Error with getting all the user plans ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_plan_by_id = async(req, res) => {
    try {
        const {id} = req.params;
        const user_id = req.user.id;
        if(!id || !user_id){
            return res.status(400).json({success: false, message: 'Provide record id and be authenticated, please login'});
        };
        const plan = await Plans.findOne({where:{id: id, user_id: user_id}});
        if(!plan){
            return res.status(404).json({success: false, message: 'No plan fetched'});
        };
        return res.status(200).json({success: true, message: 'Plan fetched', data: plan})
    } catch (error) {
        console.error(`Error with getting plan by record id ${error}`);
        return res.status(500).json({success: false, message: 'Internal server Error'});
    }
};

export const update_plan = async(req, res) => {
    try {
        const {id} = req.params;
        const {task_id, title, description, start_at, end_at} = req.body;
        if(!id){
            return res.status(400).json({success: true, message: 'Provide record id'});
        };
        const plan = await Plans.findByPk(id);
        if(!plan){
            return res.status(404).json({success: false, message: 'Invalid record id'})
        };
        const updated_plan = await plan.update({task_id, title, description, start_at, end_at});
        if(!updated_plan){
            return res.status(404).json({success: false, message: 'failed to update the record'});
        };
        return res.status(200).json({success: true, message: 'Plan record updated'})
    } catch (error) {
        console.error(`Error with updating record by id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const delete_plan = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: true, message: 'Provide record id'});
        };
        const plan = await Plans.findByPk(id);
        if(!plan){
            return res.status(404).json({success: false, message: 'Invalid record id'})
        };
        await plan.destroy();
        return res.status(200).json({success: true, message: 'Plan deleted'});
    } catch (error) {
        console.error(`Error with deleting the record by id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};