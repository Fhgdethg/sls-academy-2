import express from "express";

import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";

import db from "./db.js";
import { routes } from "./constants/routes.js";

const PORT = process.env.PORT || 2020;

const app = express();

app.use(express.json());
app.use(`${routes.auth}`, authRouter);
app.use(userRouter);

const start = async () => {
  try {
    await db.connect();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
