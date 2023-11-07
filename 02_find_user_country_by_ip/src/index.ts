import express from 'express';

import placeRouter from './routers/place.router.js';

import { connect } from './db/db.js';

import { routes } from './constants/routes.js';

const PORT = process.env.PORT || 2020;

const app = express();

app.use(express.json());
app.use(routes.api, placeRouter);
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
