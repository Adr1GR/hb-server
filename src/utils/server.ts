import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

export function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const corsOptions = {
    origin: process.env.FRONTEND_URL,
  };
  
  app.use(cors(corsOptions));

  return app;
}
