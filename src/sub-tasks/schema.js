import sequelize from '../database/config.js';
import { DataTypes } from 'sequelize';

const Sub_Tasks = sequelize.define('sub_tasks', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    task_id: {
        type: DataTypes.UUID,
        references: {
            model: 'tasks',
            key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {timestamps: true});

export default Sub_Tasks;