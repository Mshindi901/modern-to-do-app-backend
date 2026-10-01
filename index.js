import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDb} from './src/database/connect.js'
import {authenticateSocket} from './src/middleware/auth.js';
import AuthRoutes from './src/auth/routes.js';
import ProjectRoutes from './src/projects/routes.js';
import SubTaskRoutes from './src/sub-tasks/routes.js';
import TagRoutes from './src/tags/routes.js';
import TaskRoutes from './src/tasks/routes.js';
import UserRoutes from './src/users/routes.js';
import NoteRoutes from './src/notes/routes.js';
import PlanRoutes from './src/plans/routes.js';
import TeamRoutes from './src/teams/routes.js';
import TeamMemberRoutes from  './src/teams/team-members/routes.js';
import NotificattionRoutes from  './src/Notifications/router.js';


import {createServer} from 'http';
import {Server} from 'socket.io';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);
const socketServer = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true
    }
});

socketServer.use(authenticateSocket);
socketServer.on('connection', (socket) => {
    const userId = socket.user.id;
    socket.join(`user_${userId}`);
    console.log(`User ${userId} connected to socket`);
})

export {socketServer};

app.set('trust proxy', true);
app.use(express.json());
app.use(cors({origin: [process.env.CLIENT_URL]}))


app.use('/api', AuthRoutes);
app.use('/api', ProjectRoutes);
app.use('/api', SubTaskRoutes);
app.use('/api', TagRoutes);
app.use('/api', TaskRoutes);
app.use('/api', UserRoutes);
app.use('/api', NoteRoutes);
app.use('/api', PlanRoutes);
app.use('/api', TeamRoutes);
app.use('/api', TeamMemberRoutes);    
app.use('/api', NotificattionRoutes);

server.listen(PORT, () => {
    connectDb();
    console.log('Server is running');
});
