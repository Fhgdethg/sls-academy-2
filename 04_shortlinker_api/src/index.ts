import express from 'express';

import linkRouter from './routers/link.router.js';

const PORT = process.env.PORT || 2050;

const app = express();

app.use(express.json());
app.use(linkRouter);
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
