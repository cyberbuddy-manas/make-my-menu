import express from 'express';
import * as path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import mongoose from 'mongoose';
import {authMiddleware} from './middlewares/authMiddleware';

const app = express();
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/restaurant', authMiddleware, restaurantRoutes);
// app.use('/api/generateMenu', generateMenuRoutes);
// app.use('/menu', menuRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/ping', (req, res) => {
  res.send({ message: 'pong' });
});
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Could not connect to MongoDB', err));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

