import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../persistence/repositories/userRepo";
import { IUser } from "../../persistence/models/User";
import userServices from "../../persistence/services/user/userServices";

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
  UserRepository.test().subscribe({
    next: (result: string) => {
      res.send(result);
    },
  });
});

/**
 * Get all users from UserRepository.
 *
 * @route GET /
 * @returns {Observable<IUser[]>} An observable of all users.
 */
router.get("/", (req: Request, res: Response) => {
  UserRepository.getUsers().subscribe({
    next: (users: IUser[]) => {
      res.send(users);
    },
  });
});

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
 * Validate the user's credentials and add it to the database.
 *
 * @route POST /add
 * @param req.body.name The name of the user.
 * @param req.body.email The email of the user.
 * @param req.body.password The password of the user.
 * @param req.body.confirmPassword The password confirmation of the user.
 * @returns Res status 200 if the user was added successfully, or an error message if not.
 */

router.post("/add", async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }
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

  try {
    // Validate that the email is not already in use
    const user = await UserRepository.getUserByEmail(email).toPromise();
    console.log(user);
    if (user) {
      return res.status(400).send({
        message: "User already exists",
      });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userServices.createUserRequest(name, email, hashedPassword);
    await UserRepository.addUser(newUser).toPromise();

    return res.status(200).send({
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Server error",
    });
  }
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

  if (!email || !password) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }
  UserRepository.getUserByEmail(email).subscribe({
    next: (user: IUser | null) => {
      if (user) {
        bcrypt.compare(password, user.password).then((match) => {
          if (match) {
            const jwtToken = jwt.sign(
              { id: user._id, name: user.name, email: user.email, profilePic: user.profilePic },
              JWT_SECRET,
              {
                expiresIn: "7d",
              }
            );
            return res.status(200).send({
              message: "User logged in successfully",
              jwtToken,
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
 * TODO: COMPLETE THIS ROUTE
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

  if (!name && !email) {
    return res.status(400).send({
      message: "Obligatory fields are missing",
    });
  }
});

export default router;
