import sequelize from "../../database/config.js";
import { DataTypes } from "sequelize";

const TeamMembers = sequelize.define('team_members', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    team_id: {
        type: DataTypes.UUID,
        references: {
            model: 'teams',
            key: 'id'
        },
        allowNull: false
    },
    user_id: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('owner', 'admin', 'member'),
        defaultValue: 'member',
        allowNull: false
    },
    joined_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {timestamps: true});

export default TeamMembers;