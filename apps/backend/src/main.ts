import express from 'express';
import dotenv from 'dotenv';
// dotenv.config({ path: '/home/ubuntu/make-my-menu/apps/backend/.env' });
import * as path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import menuRoutes from './routes/menuRoutes';
import {engine,create} from 'express-handlebars';
import mongoose from 'mongoose';
import {authMiddleware} from './middlewares/authMiddleware';

const app = express();
app.use(cors());

const hbs = create({
  helpers: {
      ifCond: function (v1, v2, options) {
          if (v1 === v2) {
              return options.fn(this);
          }
          return options.inverse(this);
      }
  }
});

// Handlebars setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/assets/templates/'));
// Public folder setup
app.use(express.static(__dirname + '/src/assets/templates'));

app.use(bodyParser.json({limit: '50mb'}));

app.use(express.json());
app.use('/api/user', userRoutes);
// app.use('/api/restaurant', restaurantRoutes);
app.use('/api/restaurant', authMiddleware, restaurantRoutes);
// app.use('/api/generateMenu', generateMenuRoutes);
app.use('/menu', menuRoutes);
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

