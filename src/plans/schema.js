import sequelize from '../database/config.js';
import { DataTypes } from 'sequelize';

const Plans = sequelize.define('plans', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
    task_id: {
        type: DataTypes.UUID,
        references: {
            model: 'tasks',
            key: 'id'
        },
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    start_at: {
        type:DataTypes.STRING,
        allowNull: false
    },
    end_at: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: true});

export default Plans;