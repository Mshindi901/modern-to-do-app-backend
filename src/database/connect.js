import sequelize from "./config.js";

export const connectDb = async(req, res) => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected, awaiting model synchronization...');
        await sequelize.sync({alter: true});
        console.log('Models Synchronized');
    } catch (error) {
        console.error(`Error with connecting to the database ${error}`);
        return null;
    }
}