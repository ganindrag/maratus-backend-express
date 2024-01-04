import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./db";
import { category } from "./db/types";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  db.category.all().then((data: category[]) => {
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
