import Projects from "./schema.js";

export const new_project = async(req, res) => {
    try {
        const {name, color} = req.body;
        const user_id = req.user.id;
        if(!user_id || !name){
            return res.status(400).json({success: false, message: 'Authenticated Route, provide name'});
        };
        const newProject = await Projects.create({user_id, name, color});
        if(!newProject){
            return res.status(404).json({success: false, message: 'failed to create project'})
        };
        return res.status(201).json({success: true, message: 'Project added'});
    } catch (error) {
        console.error(`Error with getting a new project record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const get_all_user_projects = async(req, res) => {
    try {
        const user_id = req.user.id;
        if(!user_id){
            return res.status(400).json({success: false, message: 'Please be authenticated'});
        };
        const projects = await Projects.findAll({where:{user_id: user_id}});
        if(!projects || projects.length == 0){
            return res.status(404).json({success: false, message: 'No Projects Fetched'})
        };
        return res.status(200).json({success: true, message: 'Projects Fetced', data: projects});
    } catch (error) {
        console.error(`Error with getting all the user projects ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const update_projects = async(req, res) => {
    try {
        const {id} = req.params;
        const {name, color} = req.body;
        if(!id ){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const project = await Projects.findByPk(id);
        if(!project){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        const updated_project = await project.update({name, color});
        if(!updated_project){
            return res.status(404).json({success: false, message: 'failed to update project record'})
        };
        return res.status(200).json({success: true, message: 'Updated Project'});
    } catch (error) {
        console.error(`Error with updating project record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const delete_project_id = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id ){
            return res.status(400).json({success: false, message: 'Provide record id'});
        };
        const project = await Projects.findByPk(id);
        if(!project){
            return res.status(404).json({success: false, message: 'Invalid Id'})
        };
        await project.destroy();
        return res.status(200).json({success: true, messsage: 'Deleted Project'});
    } catch (error) {
        console.error(`Error with deleting project by id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};