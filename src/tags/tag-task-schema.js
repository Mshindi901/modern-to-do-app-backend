import sequelize from "../database/config.js";
import { DataTypes } from "sequelize";


const Tag_Tasks = sequelize.define('tag_tasks', {
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
        allowNull: false,
        onDelete: 'CASCADE'
    },
    tag_id: {
        type: DataTypes.UUID,
        references: {
            model: 'tags',
            key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
    }
}, {timestamps: true});

export default Tag_Tasks;