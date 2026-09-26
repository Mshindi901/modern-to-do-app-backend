import sequelize from "../database/config.js";
import { DataTypes } from "sequelize";

const Tasks = sequelize.define('tasks', {
    id: {
        type: DataTypes.UUID,
        defaultValue:  DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    team_id:{
        type:DataTypes.UUID,
        references:{
            model: 'teams',
            key: 'id'
        },
        allowNull: true
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    },
    project_id: {
        type: DataTypes.UUID,
        references: {
            model: 'projects',
            key: 'id'
        },
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    context: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        defaultValue: 'low',
        allowNull: false
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    is_starred: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {timestamps: true});

export default Tasks;