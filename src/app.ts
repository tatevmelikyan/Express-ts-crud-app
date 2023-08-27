import express from "express";
import { Request, Response, NextFunction } from "express";

import userRoutes from "./router/user-router.js";

import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;

function authorization(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(authorization);

app.use(userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
