import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "http://localhost";

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

mongoose.connect(MONGO_URI, {
  // useCreateIndex: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
