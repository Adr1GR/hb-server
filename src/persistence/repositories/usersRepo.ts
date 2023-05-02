import { from, Observable, map } from "rxjs";
import { IUser } from "../models/User";
import { UserModel } from "../models/User";

interface UserRepository {
  test(): Observable<string>;
  addUser(user: IUser): Observable<IUser>;
  getUserByEmail(email: string): Observable<IUser | null>;
}

export const UserRepository: UserRepository = {
  test: () => from(["Hello soy un string"]),
  addUser: (user: IUser): Observable<IUser> => {
    return from(UserModel.create(user));
  },
  getUserByEmail: (email: string): Observable<IUser | null> => {
    return from(UserModel.findOne({ email })).pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return user;
      })
    );
  },
};
