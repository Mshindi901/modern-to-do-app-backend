import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const db_password = process.env.DB_PASSWORD;
const db_url = process.env.DB_URL;

const sequelize = new Sequelize(db_url, {
    host: 'localhost',
    dialect: 'postgres',
    logging:  false
});

export default sequelize;