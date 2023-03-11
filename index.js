import dotenv from 'dotenv'; 
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as path from 'path';
import projectsRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
import commentsRoutes from './routes/comments.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../build")));

app.use('/projects', projectsRoutes);
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);
app.use('/comments', commentsRoutes);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(port || 5000, () => {
    console.log(`App running on port ${PORT}.`);
 });