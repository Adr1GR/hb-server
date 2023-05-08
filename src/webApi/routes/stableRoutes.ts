import express, { Request, Response } from "express";
import { StableRepository } from "../../persistence/repositories/stableRepo";
import { IStable } from "../../persistence/models/Stable";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import stableServices from "../../persistence/services/stable/stableServices";
import { UserRepository } from "../../persistence/repositories/userRepo";

require("dotenv").config();
const router = express.Router();
const JWT_SECRET: any = process.env.JWT_SECRET;

/**
 * Get the test result from StableRepository.
 *
 * @route GET /test
 * @returns {Observable<string>} The test result.
 */
router.get("/test", (req: Request, res: Response) => {
  StableRepository.test().subscribe({
    next: (result: string) => {
      res.send(result);
    },
  });
});

/**
 * Get all stables from StableRepository.
 *
 * @route GET /
 * @returns {Observable<IStable[]>} An observable of all stables.
 */
router.get("/", (req: Request, res: Response) => {
  StableRepository.getStables().subscribe({
    next: (stables: IStable[]) => {
      res.send(stables);
    },
  });
});

router.get("/:id", (req: Request, res: Response) => {
  StableRepository.getStableById(req.params.id).subscribe({
    next: (user: IStable | null) => {
      if (user) {
        return res.status(200).send(user);
      } else {
        return res.status(404).send({
          message: "Stable not found",
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

/**
 * Add a new stable to the database.
 *
 * @route POST /add
 * @return Res status 200 and the stable if it was added successfully, or an error message if not.
 */
router.post("/add", async (req: Request, res: Response) => {
  const { name, street, city, postalCode, country, address, state, jwtToken } =
    req.body;

  if (!jwtToken) {
    return res.status(400).send({
      message: "No jwt token provided",
    });
  }

  if (!name || !street || !city || !postalCode || !country || !address) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }
  try {
    try {
      const decoded = jwt.verify(jwtToken, JWT_SECRET);
      //@ts-ignore
      let owner = new mongoose.Types.ObjectId(decoded.id);
      let _id = new mongoose.Types.ObjectId();
      const newStable = await stableServices.createStableRequest(
        _id,
        name,
        street,
        city,
        postalCode,
        country,
        address,
        owner,
        state
      );
      UserRepository.addStableToUser(owner, _id).subscribe();
        
      return res.status(200).send({
        message: "Stable added successfully",
        stable: newStable,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        message: "Invalid jwt token",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error",
    });
  }
});
export default router;
