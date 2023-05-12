import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

require("dotenv").config();
const FRONTEND_URL = process.env.FRONTEND_URL;
console.log(FRONTEND_URL);

export function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const corsOptions = {
    origin: FRONTEND_URL,
  };

  app.use(cors(corsOptions));

  return app;
}
