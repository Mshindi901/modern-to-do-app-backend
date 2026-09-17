import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const db_password = process.env.DB_PASSWORD;

const sequelize = new Sequelize('todo', 'postgres', db_password, {
    host: 'localhost',
    dialect: 'postgres',
    logging:  false
});

export default sequelize;