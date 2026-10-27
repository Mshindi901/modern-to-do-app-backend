import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

//I Had to add a comment the re-push the code for cloudflare pages
const db_password = process.env.DB_PASSWORD;
const db_url = process.env.DB_URL || 'postgresql://neondb_owner:npg_eDQIgtVNP7L2@ep-curly-surf-b57fgp7k-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const sequelize = new Sequelize(db_url, {
    host: process.env.DB_HOST || 'localhost',
    password: db_password,
    dialect: 'postgres',
    logging:  false
});

export default sequelize;