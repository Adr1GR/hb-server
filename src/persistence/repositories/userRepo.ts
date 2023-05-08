import { from, Observable, map } from "rxjs";
import { IUser } from "../models/User";
import { UserModel } from "../models/User";
import mongoose from "mongoose";

/**
 * Interface for user repository.
 *
 * @interface UserRepository
 */
interface UserRepository {
  /**
   * Returns an observable of a test string.
   *
   * @returns {Observable<string>} An observable of a test string.
   */
  test(): Observable<string>;

  /**
   * Returns an observable of all users.
   *
   * @returns {Observable<IUser[]>} An observable of all users.
   */
  getUsers(): Observable<IUser[]>;

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
   * Updates the user with the specified id.
   *
   * @param {IUser} user The user to update with the new values.
   * @returns {Observable<IUser | null>}
   */
  updateUser(user: IUser): Observable<IUser | null>;

  /**
   * Deletes the user with the specified id.
   *
   * @param {string} id The id of the user to delete.
   * @returns {Observable<IUser | null>}
   */
  deleteUserByid(id: string): Observable<IUser | null>;

  /**
   * Validates the user with the specified email and password.
   *
   * @param {string} email The email of the user to validate.
   * @param {string} password The password of the user to validate.
   * @returns {Observable<IUser | null>}
   *
   * @deprecated
   */
  validateUser(email: string, password: string): Observable<IUser | null>;

  /**
   * Adds the stable with the specified id to the user with the specified id.
   *
   * @param {mongoose.Types.ObjectId} userId The id of the user to add the stable to.
   * @param {mongoose.Types.ObjectId} stableId The id of the stable to add to the user.
   * @returns {Observable<IUser | null>}
   */
  addStableToUser(
    userId: mongoose.Types.ObjectId,
    stableId: mongoose.Types.ObjectId
  ): Observable<IUser | null>;
}

/**
 * Repository for users.
 * @implements {UserRepository}
 * @category Repositories
 */
export const UserRepository: UserRepository = {
  test: () => from(["Hello im a string"]),
  getUsers: (): Observable<IUser[]> => {
    return from(UserModel.find().exec());
  },
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
  addStableToUser: (
    userId: mongoose.Types.ObjectId,
    stableId: mongoose.Types.ObjectId
  ): Observable<IUser | null> => {
    return from(
      UserModel.findByIdAndUpdate(userId, {
        $push: { stables: stableId },
      }).exec()
    );
  },
};
