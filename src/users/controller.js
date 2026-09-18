import Users from '../auth/schema.js';
import Visitors from '../auth/visitor-schema.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        if(!users || users.length == 0){
            return res.status(404).json({success: false, message: 'No users Fetched'});
        };
        return res.status(200).json({success: true, message: 'Users Fetched', data: users})
    } catch (error) {
        console.error(`Error with getting all user records ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getUserByEmail = async(req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({success: false, message: 'Provide Email'});
        };
        const is_user = await Users.findOne({where:{email: email}});
        if(!is_user){
            return res.status(404).json({success: false, message: 'Invalid Email'});
        };
        return res.status(200).json({success: true, message: 'User Fetched', data: is_user})
    } catch (error) {
        console.error(`Error getting a user by email ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const getUserById = async(req, res) => {
    try {
        const {id} = req.user.id;
        if(!id){
            return res.status(400).json({success: false, message: 'Not authenticated, Please Login'});
        };
        const user = await Users.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        return res.status(200).json({success: true, message: 'User Fetched', data: user})
    } catch (error) {
        console.error(`Error getting user by record id ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const updateUser = async(req, res) => {
    try {
        const {id} = req.user.id;
        if(!id){
            return res.status(400).json({success: false, message: 'Not authenticated, Please Login'});
        };
        const {name, email} = req.body;
        const user = await Users.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const updated_user = await user.update({name, email});
        if(!updated_user){
            return res.status(404).json({success: false, message: 'Failed to update'})
        };
        return res.status(200).json({success: true, message: 'User Record Updated'})
    } catch (error) {
        console.error(`Error with updating user record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'})
    }
};

export const updateUserPassword = async(req, res) => {
    try {
        const {id} = req.user.id;
        if(!id){
            return res.status(400).json({success: false, message: 'Not authenticated, Please Login'});
        };
        const {new_password} = req.body
        const user = await Users.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        const is_password_same = await bcrypt.compare(new_password, user.password);
        if(is_password_same){
            return res.status(400).json({success: false, message: 'Same Password'})
        };
        const new_hashed_passoword = await bcrypt.hash(new_password, 12);
        const updated_password = await user.update({password: new_hashed_passoword});
        if(!updated_password){
            return res.status(404).json({success: false, message: 'Failed to update user'})
        };
        return res.status(200).json({success: true, message: 'Password updated'})
    } catch (error) {
        console.error(`Error with updating user record password ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};


export const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: 'Not authenticated, Please Login'});
        };
        const user = await Users.findByPk(id);
        if(!user){
            return res.status(404).json({success: false, message: 'Invalid Id'});
        };
        await user.destroy();
        return res.status(200).json({success: true, message: 'user deleted'});
    } catch (error) {
        console.error(`Error with deleting user record ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const viewvistors = async(req, res) => {
    try {
        const all_visitors = await Visitors.findAll();
        if(!all_visitors || all_visitors.length == 0){
            return res.status(404).json({success: false, message: 'No vistors fetched record'});
        };
        return res.status(200).json({success: true, message: 'Visitors Fetched', data: all_visitors})
    } catch (error) {
        console.error(`Error with vieweing vistors records ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

