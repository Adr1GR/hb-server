import { Observable } from "rxjs";
import { connect, Connection, model, Schema, Document } from "mongoose";

require("dotenv").config();

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1y8mmia.mongodb.net/?retryWrites=true&w=majority`;
//const MONGODBTEST_URI = `mongodb+srv://${process.env.MONGODB_USER_TESTING}:${process.env.MONGODB_PASSWORD_TESTING}@cluster0.iqt8x9e.mongodb.net/?retryWrites=true&w=majority`;

/**
 * Connects to the database.
 * It requires the MONGODB_URI environment variable to be set in the .env file.
 *
 *
 * @returns Observable<Connection>
 * @exports connectToDatabase
 */
export const connectToDatabase = (): Observable<Connection> => {
  return new Observable<Connection>((observer) => {
    connect(MONGODB_URI) // CHANGE THIS TO MONGODB_URI WHEN YOU ARE DONE TESTING
      .then((connection) => {
        observer.next(connection.connection);
      })
      .catch((error) => {
        observer.error(error);
      })
      .finally(() => {
        observer.complete();
      });
  });
};
