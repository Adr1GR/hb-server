import express, { Request, Response, Router } from "express";
import { from, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../persistence/repositories/usersRepo";
import { IUser, UserModel } from "../../persistence/models/User";
import { error } from "console";
import { get } from "lodash";

require('dotenv').config();
const router = express.Router();
const JWT_SECRET: any = process.env.JWT_SECRET;

/**
 * Get the test result from UserRepository.
 *
 * @route GET /test
 * @returns {Observable<string>} The test result.
 */
router.get("/test", (req: Request, res: Response) => {
  UserRepository.test().subscribe({
    next: (result: string) => {
      res.send(result);
    },
  });
});

/**
 * Validate the user's credentials and add it to the database.
 *
 * @route POST /add
 * @param req.body.name The name of the user.
 * @param req.body.email The email of the user.
 * @param req.body.password The password of the user.
 * @param req.body.confirmPassword The password confirmation of the user.
 * @returns Res status 200 if the user was added successfully, or an error message if not.
 */
router.post("/add", (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password, confirmPassword } = req.body;

  // Validate that all required fields are present
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  // Validate that the passwords match and have at least 6 characters
  if (password !== confirmPassword) {
    return res.status(400).send({
      message: "Passwords do not match",
    });
  }

  if (password.length < 6) {
    return res.status(400).send({
      message: "Password must be at least 6 characters",
    });
  }

  // Validate that the email is not already in use
  UserRepository.getUserByEmail(email).subscribe({
    next: (user: IUser | null) => {
      console.log(user);
      if (user) {
        return res.status(400).send({
          message: "User already exists",
        });
      } else {
        // Hash the password and add the user to the database
        bcrypt.hash(password, 10).then((hash) => {
          const newUser: IUser = {
            name,
            email,
            password: hash,
          };
          return UserRepository.addUser(newUser).subscribe(() => {
            return res.status(200).send({
              message: "User added successfully",
            });
          });
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

/**
 * Get a user by their id.
 *
 * @route GET /:id
 * @param req.params.id The id of the user to get.
 * @returns Res status 200 and the user if found, or an error message if not.
 */
router.get("/:id", (req: Request, res: Response) => {
  UserRepository.getUserById(req.params.id).subscribe({
    next: (user: IUser | null) => {
      if (user) {
        return res.status(200).send(user);
      } else {
        return res.status(404).send({
          message: "User not found",
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
 * Login a user: validate user credentials and store their JWT in the localstorage
 * if they are valid.
 * 
 * @route POST /login
 * @param req.body.email The email of the user.
 * @param req.body.password The password of the user.
 * @returns Res status 200 and the user's JWT if the user was logged in successfully, or an error message if not.
 */
router.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validate that all required fields are present
  if (!email || !password) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  UserRepository.getUserByEmail(email).subscribe({
    next: (user: IUser | null) => {
      console.log(user);
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const token = jwt.sign(
              { email: user.email, profilePic: user.profilePic },
              JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );
            return res.status(200).send({
              message: "User logged in successfully",
              token,
            });
          } else {
            return res.status(400).send({
              message: "Invalid credentials",
            });
          }
        });
      } else {
        return res.status(400).send({
          message: "Invalid credentials",
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
 * Update a user by their id.
 *
 * TODO - COMPLETE THIS
 * 
 * @route POST /update/:id
 * @param req.params.id The id of the user to update.
 * @param userData The data to update the user with.
 * @returns Res status 200 and the updated user if found and updated successfully, or an error message if not.
 */
router.post("/update/:id", (req: Request, res: Response) => {
  const {
    name,
    surname,
    email,
    street,
    city,
    state,
    postalCode,
    country,
    phoneNumber,
  } = req.body;

  // Check if obligatory fields are missing
  if (!name && !email) {
    return res.status(400).send({
      message: "Obligatory fields are missing",
    });
  }
});
