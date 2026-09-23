import sequelize from '../database/config.js';
import { DataTypes } from 'sequelize';

const Notes = sequelize.define('notes', {
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
    context: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {timestamps: true});

export default Notes;