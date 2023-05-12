import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

require("dotenv").config();
const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN;
console.log(CORS_ALLOWED_ORIGIN);

export function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const corsOptions = {
    origin: CORS_ALLOWED_ORIGIN,
  };

  app.use(cors(corsOptions));

  return app;
}
