import { from, Observable, map } from "rxjs";
import { IUser } from "../models/User";
import { UserModel } from "../models/User";

/**
 * Interface for user repository.
 *
 * @interface UserRepository
 *
 */
interface UserRepository {
  /**
   * Returns an observable of a test string.
   *
   * @returns {Observable<string>} An observable of a test string.
   */
  test(): Observable<string>;

  /**
   * Adds a new user to the database.
   *
   * @param {IUser} user The user to add.
   * @returns {Observable<IUser>} An observable of the added user.
   */
  addUser(user: IUser): Observable<IUser>;

  /**
   * Returns an observable of the user with the specified email address, or null if not found.
   *
   * @param {string} email The email address of the user to find.
   * @returns {Observable<IUser | null>} An observable of the found user, or null if not found.
   */
  getUserByEmail(email: string): Observable<IUser | null>;

  /**
   * Returns an observable of the user with the specified id, or null if not found.
   *
   * @param {string} id The id of the user to find.
   * @returns {Observable<IUser | null>} An observable of the found user, or null if not found.
   */
  getUserById(id: string): Observable<IUser | null>;

  /**
   * Returns an observable of the user with the specified name, or null if not found.
   *
   * @param {string} name The name of the user to find.
   * @returns {Observable<IUser | null>} An observable of the found user, or null if not found.
   */
  getUserByName(name: string): Observable<IUser | null>;

  /**
   * TODO - Document this method
   *
   * @param {IUser} user The user to update.
   * @returns {Observable<IUser | null>}
   * @category ToDocumentate
   */
  updateUser(user: IUser): Observable<IUser | null>;

  /**
   * TODO - Document this method
   *
   * @param {string} id The id of the user to delete.
   * @returns {Observable<IUser | null>}
   * @category ToDocumentate
   */
  deleteUserByid(id: string): Observable<IUser | null>;

  /**
   * TODO - Document this method
   *
   * @param {string} email The email of the user to validate.
   * @param {string} password The password of the user to validate.
   * @returns {Observable<IUser | null>}
   * @category ToDocumentate
   */
  validateUser(email: string, password: string): Observable<IUser | null>;
}

/**
 * Repository for users.
 * @implements {UserRepository}
 * @category Repositories
 */
export const UserRepository: UserRepository = {
  test: () => from(["Hello im a string"]),
  addUser: (user: IUser): Observable<IUser> => {
    return from(UserModel.create(user));
  },
  getUserByEmail: (email: string): Observable<IUser | null> => {
    return from(UserModel.findOne({ email }).exec());
  },
  getUserById: (id: string): Observable<IUser | null> => {
    return from(UserModel.findById(id).exec());
  },
  getUserByName: (name: string): Observable<IUser | null> => {
    return from(UserModel.findOne({ name }).exec());
  },
  updateUser: (user: IUser): Observable<IUser | null> => {
    return from(UserModel.findByIdAndUpdate(user._id, user).exec());
  },
  deleteUserByid: (id: string): Observable<IUser | null> => {
    return from(UserModel.findByIdAndDelete(id).exec());
  },
  validateUser: (email: string, password: string): Observable<IUser | null> => {
    return from(UserModel.findOne({ email })).pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        if (user.password !== password) {
          return null;
        }
        return user;
      })
    );
  },
};
