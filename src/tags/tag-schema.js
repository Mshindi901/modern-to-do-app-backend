import sequelize from '../database/config.js';
import { DataTypes, UUIDV4 } from 'sequelize';

const Tags = sequelize.define('tags', {
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
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        },
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {timestamps: true});

export default Tags;