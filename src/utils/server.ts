import express from "express";
import bodyParser from "body-parser";

var cors = require("cors");

export function createServer() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  return app;
}