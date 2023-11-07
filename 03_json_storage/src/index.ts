import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

import jsonBaseRouter from './routers/jsonStorage.router.js';

const app = new Koa();

app.use(json());
app.use(bodyParser());

app.use(jsonBaseRouter.routes());

const PORT = process.env.PORT || 2040;

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
