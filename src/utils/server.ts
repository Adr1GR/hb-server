import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

export function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors({
    origin: process.env.FRONTEND_URL_LOCAL + "*" || "http://localhost:3000",
  }));

  return app;
}
