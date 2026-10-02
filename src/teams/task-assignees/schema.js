import sequelize from '../../database/config.js';
import { DataTypes } from 'sequelize';

const TaskAssignee = sequelize.define('task_assignees', {
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
    member_id: {
        type: DataTypes.UUID,
        references: {
            model: 'team_members',
            key: 'id'
        },
        allowNull: false
    },
    assigned_by: {
        type: DataTypes.UUID,
        references: {
            model: 'user',
            key: 'id'
        },
        allowNull: false
    },
    assigned_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {timestamps: true});

export default TaskAssignee;