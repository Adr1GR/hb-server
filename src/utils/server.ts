import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

export function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URL_LOCAL, process.env.MACHINE_IP];

  const corsOptions = {
    origin: function (origin: any, callback: any) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  app.use(cors(corsOptions));

  return app;
}
