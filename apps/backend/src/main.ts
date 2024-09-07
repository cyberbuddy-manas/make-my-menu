import express from 'express';
import * as path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));

app.use(express.json());
app.use('/api/user', userRoutes);
// app.use('/api/generateMenu', generateMenuRoutes);
// app.use('/menu', menuRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
