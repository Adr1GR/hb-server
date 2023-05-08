import { from, Observable, map } from "rxjs";
import { IStable } from "../models/Stable";
import { StableModel } from "../models/Stable";

/**
 * Interface for stable repository
 *
 * @interface StableRepository
 */
interface StableRepository {
  /**
   * Returns an observable of a test string.
   *
   * @returns {Observable<string>} An observable of a test string.
   */
  test(): Observable<string>;

  /**
   * Returns an observable of all stables.
   *
   * @returns {Observable<IStable[]>} An observable of all stables.
   */
  getStables(): Observable<IStable[]>;

  /**
   * Adds a new stable to the database.
   *
   * @param {IStable} stable The stable to add.
   * @returns {Observable<IStable>} An observable of the added stable.
   */
  addStable(stable: IStable): Observable<IStable>;

  /**
   * Returns an observable of the stable with the specified id, or null if not found.
   *
   * @param {string} id The id of the stable to find.
   * @returns {Observable<IStable | null>} An observable of the found stable, or null if not found.
   */
  getStableById(id: string): Observable<IStable | null>;

  /**
   * Returns an observable of the stable with the specified name, or null if not found.
   *
   * @param {string} name The name of the stable to find.
   * @returns {Observable<IStable | null>} An observable of the found stable, or null if not found.
   */
  getStableByName(name: string): Observable<IStable | null>;

  /**
   * Updates the stable with the specified id.
   * 
   * @param {IStable} stable The stable to update with the new values.
   * @returns {Observable<IStable | null>} An observable of the updated stable, or null if not found.
   */
  updateStable(stable: IStable): Observable<IStable | null>;

  /**
   * Deletes the stable with the specified id.
   * 
   * @param {string} id The id of the stable to delete.
   * @returns {Observable<IStable | null>} An observable of the deleted stable, or null if not found.
   */
  deleteStableById(id: string): Observable<IStable | null>;

  /**
   * Adds the horse with the specified id to the stable with the specified id.
   * 
   * @param {string} stableId The id of the stable to add the horse to.
   * @param {string} horseId The id of the horse to add to the stable.
   * @returns {Observable<IStable | null>} An observable of the updated stable, or null if not found.
   */
  addHorseToStable(
    stableId: string,
    horseId: string
  ): Observable<IStable | null>;

  /**
   * Removes the horse with the specified id from the stable with the specified id.
   * 
   * @param {string} stableId The id of the stable to remove the horse from.
   * @param {string} horseId The id of the horse to remove from the stable.
   * @returns {Observable<IStable | null>} An observable of the updated stable, or null if not found.
   */
  removeHorseFromStable(
    stableId: string,
    horseId: string
  ): Observable<IStable | null>;
}

export const StableRepository: StableRepository = {
  test: () => from(["Hello im a string"]),
  getStables: (): Observable<IStable[]> => {
    return from(StableModel.find().exec());
  },
  addStable: (stable: IStable): Observable<IStable> => {
    return from(StableModel.create(stable));
  },
  getStableById: (id: string): Observable<IStable | null> => {
    return from(StableModel.findById(id).exec());
  },
  getStableByName: (name: string): Observable<IStable | null> => {
    return from(StableModel.findOne({ name }).exec());
  },
  updateStable: (stable: IStable): Observable<IStable | null> => {
    return from(StableModel.findByIdAndUpdate(stable._id, stable).exec());
  },
  deleteStableById: (id: string): Observable<IStable | null> => {
    return from(StableModel.findByIdAndDelete(id).exec());
  },
  addHorseToStable: (
    stableId: string,
    horseId: string
  ): Observable<IStable | null> => {
    return from(
      StableModel.findByIdAndUpdate(stableId, {
        $push: { horses: horseId },
      }).exec()
    );
  },
  removeHorseFromStable: (
    stableId: string,
    horseId: string
  ): Observable<IStable | null> => {
    return from(
      StableModel.findByIdAndUpdate(stableId, {
        $pull: { horses: horseId },
      }).exec()
    );
  },
};
