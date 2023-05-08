import { from, Observable, map } from "rxjs";
import { IHorse } from "../models/Horse";
import { HorseModel } from "../models/Horse";

/**
 * Interface for horse repository.
 *
 * @interface HorseRepository
 */
interface HorseRepository {
  /**
   * Returns an observable of a test string.
   *
   * @returns {Observable<string>} An observable of a test string.
   */
  test(): Observable<string>;

  /**
   * Adds a new horse to the database.
   *
   * @param {IHorse} horse The horse to add.
   * @returns {Observable<IHorse>} An observable of the added horse.
   */
  addHorse(horse: IHorse): Observable<IHorse>;

  /**
   * Returns an observable of the horse with the specified name, or null if not found.
   *
   * @param {string} name The name of the horse to find.
   * @returns {Observable<IHorse | null>} An observable of the found horse, or null if not found.
   */
  getHorseById(id: string): Observable<IHorse | null>;

  /**
   * Deletes the horse with the specified id from the database.
   *
   * @param {string} id The id of the horse to delete.
   * @returns {Observable<IHorse | null>} An observable of the deleted horse, or null if not found.
   */
  deleteHorseById(id: string): Observable<IHorse | null>;

  /**
   * Updates the horse with the specified id.
   *
   * @param {IHorse} horse The horse to update.
   * @returns {Observable<IHorse | null>}
   * @category ToDocumentate
   */
  updateHorse(horse: IHorse): Observable<IHorse | null>;
}

/**
 * Repository for horses.
 * @implements {HorseRepository}
 * @category Repositories
 */
export const HorseRepository: HorseRepository = {
  test(): Observable<string> {
    return from(["Hello World!"]);
  },
  addHorse(horse: IHorse): Observable<IHorse> {
    return from(HorseModel.create(horse));
  },
  getHorseById(id: string): Observable<IHorse | null> {
    return from(HorseModel.findById(id).exec());
  },
  deleteHorseById(id: string): Observable<IHorse | null> {
    return from(HorseModel.findByIdAndDelete(id).exec());
  },
  updateHorse(horse: IHorse): Observable<IHorse | null> {
    return from(HorseModel.findByIdAndUpdate(horse._id, horse)).pipe(
      map((horse) => {
        if (!horse) {
          return null;
        }
        return horse;
      })
    );
  },
};