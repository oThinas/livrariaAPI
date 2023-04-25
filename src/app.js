import express from 'express';

import { db } from '../config/dbConnect.js';

import { routes } from './routes/index.js';

import { handleErrors } from './middlewares/handleErrors.js';
import { handle404 } from './middlewares/handle404.js';

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to database'));

export const app = express();
app.use(express.json());
routes(app);

app.use(handle404);
app.use(handleErrors);
