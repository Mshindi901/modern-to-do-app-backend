import Users from "./schema.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Visitors from "./visitor-schema.js";
dotenv.config();


export const signup = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({success: false, message: 'Provide full info'});
        };
        const is_user = await Users.findOne({where:{email: email}});
        if(is_user){
            return res.status(404).json({success: false, message: 'Email already exists'});
        };
        const hashed_password = await bcrypt.hash(password, 12);
        const new_user = await Users.create({name, email, password: hashed_password});
        if(!new_user){
            return res.status(404).json({success: false, message: 'Failed to create user'})
        };
        return res.status(201).json({success: true, message: 'User Created'});
    } catch (error) {
        console.error(`Error with signing up new user ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};

export const signin = async(req, res) => {
    try {
        const {email, password, logged_in, logged_at, time} = req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: 'Provide email and password'});
        };

        const ip = req.ip;
        const is_user = await Users.findOne({where:{email: email}});
        if(!is_user){
            return res.status(404).json({success: false, message: 'Email does not exist'});
        };

        const is_password = await bcrypt.compare(password, is_user.password);
        if(!is_password){
            return res.status(404).json({success: false, message: 'Invalid Password'});
        };

        const loginDate = new Date();
        const visitorLoggedIn = logged_in || logged_at || loginDate.toISOString().split('T')[0];
        const visitorTime = time || loginDate.toLocaleTimeString('en-GB', { hour12: false });

        await Visitors.create({
            user_name: is_user.name,
            user_email: is_user.email,
            user_ip: ip,
            logged_in: visitorLoggedIn,
            time: visitorTime,
        });

        const token = jwt.sign({id: is_user.id, role: is_user.role}, process.env.ACCESS_TOKEN, {expiresIn: '1h'});
        return res.status(200).json({success: true, message: 'Users signed in', data: token})
    } catch (error) {
        console.error(`Error signin in user to account ${error}`);
        return res.status(500).json({success: false, message: 'Internal Server Error'});
    }
};
