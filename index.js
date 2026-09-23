import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDb} from './src/database/connect.js'
import AuthRoutes from './src/auth/routes.js';
import ProjectRoutes from './src/projects/routes.js';
import SubTaskRoutes from './src/sub-tasks/routes.js';
import TagRoutes from './src/tags/routes.js';
import TaskRoutes from './src/tasks/routes.js';
import UserRoutes from './src/users/routes.js';
import NoteRoutes from './src/notes/routes.js';
import PlanRoutes from './src/plans/routes.js';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(cors({origin: ['https://modern-to-do-app-frontend.vercel.app']}))


app.use('/api', AuthRoutes);
app.use('/api', ProjectRoutes);
app.use('/api', SubTaskRoutes);
app.use('/api', TagRoutes);
app.use('/api', TaskRoutes);
app.use('/api', UserRoutes);
app.use('/api', NoteRoutes);
app.use('/api', PlanRoutes);

app.listen(PORT, () => {
    connectDb();
    console.log('Server is running');
});
