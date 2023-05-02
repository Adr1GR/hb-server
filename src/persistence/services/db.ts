import { Observable } from "rxjs";
import { connect, Connection, model, Schema, Document } from 'mongoose';

require('dotenv').config();

const MONGODB_URI =  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1y8mmia.mongodb.net/?retryWrites=true&w=majority` ;

export const connectToDatabase = (): Observable<Connection> => {
  return new Observable<Connection>((observer) => {
    connect(MONGODB_URI)
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
