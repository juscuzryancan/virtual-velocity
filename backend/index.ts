// This is the Web Server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import apiRoutes from "./routes";
import { client } from "./db";

const server = express();
server.use(cors());

//process env variables
dotenv.config();

// create logs for everything
server.use(morgan("dev"));

// handle application/json requests
server.use(bodyParser.json());

// here's our static files
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// server.use(express.static(path.join(__dirname, "../frontend/dist")));

// here's our API
server.use("/api", apiRoutes);

// by default serve up the react app if we don't recognize the route
server.use((req: any, res: any, next: any) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

// error handler
server.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).send(err);
});

// connect to the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
