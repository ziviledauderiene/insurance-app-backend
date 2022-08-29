import express from 'express';
import mongoose from 'mongoose';
// require('dotenv').config({ path: '.env' });
import dotenv from 'dotenv'

import { testRouter } from './routes/test';

const app = express();

dotenv.config()

const {
  PORT,
  MONGO_COMPASS_USER,
  MONGO_COMPASS_PASS,
  MONGO_COMPASS_CLUSTER_DB,
  MONGO_COMPASS_CLUSTER_URL,
} = process.env;

app.use(express.json());
app.use(testRouter);

const db = mongoose.connection;
mongoose.connect(
  `mongodb+srv://${MONGO_COMPASS_USER}:${MONGO_COMPASS_PASS}@${MONGO_COMPASS_CLUSTER_URL}/${MONGO_COMPASS_CLUSTER_DB}?retryWrites=true&w=majority`
);

db.once('open', () => {
  console.log('Connected to DB successfully!');
  app.listen(PORT, () =>
    console.log(`Server is running on port http://localhost:${PORT}`)
  );
});

db.on('error', () => console.error('FAILED TO CONNECT TO DB'));
