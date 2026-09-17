import express from 'express';
import dotenv from 'dotenv';
import {connectDb} from './src/database/connect.js'
import AuthRoutes from './src/auth/routes.js';
import ProjectRoutes from './src/projects/routes.js';
import SubTaskRoutes from './src/sub-tasks/routes.js';
import TagRoutes from './src/tags/routes.js';
import TaskRoutes from './src/tasks/routes.js';
import UserRoutes from './src/users/routes.js';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.use('/api', AuthRoutes);
app.use('/api', ProjectRoutes);
app.use('/api', SubTaskRoutes);
app.use('/api', TagRoutes);
app.use('/api', TaskRoutes);
app.use('/api', UserRoutes);

app.listen(PORT, () => {
    connectDb();
    console.log('Server is running');
})
