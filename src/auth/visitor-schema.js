import sequelize from "../database/config.js";
import { DataTypes } from "sequelize";

const Visitors = sequelize.define('vistors', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_ip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    logged_in: {
        type: DataTypes.DATE,
        allowNull: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {timestamps: true});

export default Visitors;