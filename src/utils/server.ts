import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

export function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(cors({
    origin: "https://horsebreeders.vercel.app",
  }));

  return app;
}
