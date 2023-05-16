import express, { Request, Response } from "express";
import { IHorse } from "../../persistence/models/Horse";
import { HorseRepository } from "../../persistence/repositories/horseRepo";

require("dotenv").config();
const router = express.Router();
const JWT_SECRET: any = process.env.JWT_SECRET;

/**
 * Get the test result from UserRepository.
 *
 * @route GET /test
 * @returns {Observable<string>} The test result.
 */
router.get("/test", (req: Request, res: Response) => {
  HorseRepository.test().subscribe({
    next: (result: string) => {
      res.send(result);
    },
  });
});

/**
 * Get all horses from HorseRepository.
 *
 * @route GET /
 * @returns {Observable<IHorse[]>} An observable of all horses.
 */
router.get("/", (req: Request, res: Response) => {
  HorseRepository.getHorses().subscribe({
    next: (horses: IHorse[]) => {
      res.send(horses);
    },
  });
});

/**
 * Get a horse by their id.
 * 
 * @route GET /:id
 * @param req.params.id The id of the horse to get.
 * @returns Res status 200 and the horse if found, or an error message if not.
 */
router.get("/:id", (req: Request, res: Response) => {
  HorseRepository.getHorseById(req.params.id).subscribe({
    next: (horse: IHorse | null) => {
      if (horse) {
        return res.status(200).send(horse);
      } else {
        return res.status(404).send({
          message: "Horse not found",
        });
      }
    },
    error: () => {
      return res.status(500).send({
        message: "Server error",
      });
    },
  });
});

export default router;