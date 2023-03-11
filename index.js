import dotenv from 'dotenv'; 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as path from 'path';
import { fileURLToPath } from 'url';
import projectsRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
import commentsRoutes from './routes/comments.js';

const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, "vcc-pms/build")));

app.use('/projects', projectsRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.use('/comments', commentsRoutes);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'vcc-pms/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT || 5000, () => {
    console.log(`App running on port ${PORT}.`);
 });