import sequelize from '../database/config.js';
import {DataTypes} from 'sequelize';

const Notification = sequelize.define('notifications', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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
    team_id: {
        type: DataTypes.UUID,
        references: {
            model: 'teams',
            key: 'id'
        },
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entity_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    entity_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {timestamps: true});

export default Notification;