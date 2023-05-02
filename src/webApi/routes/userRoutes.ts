import express, { Request, Response, Router } from "express";
import { from, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import bcrypt from "bcryptjs";
import { UserRepository } from "../../persistence/repositories/usersRepo";
import { IUser, UserModel } from "../../persistence/models/User";

const router = express.Router();

//! ********** TODO - Fix user already exists error **********

// Test route
router.get("/test", (req: Request, res: Response) => {
  UserRepository.test().subscribe({
    next: (result: string) => {
      res.send(result);
    },
  });
});

// Register user
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
  const existingUser$ = UserRepository.getUserByEmail(email).pipe(
    switchMap((user) => {
      if (user) {
        return throwError(new Error("Email already in use"));
      }
      return from(
        bcrypt.hash(password, 10).then((hash) => {
          const newUser: IUser = {
            name,
            email,
            password: hash,
          };
          return UserRepository.addUser(newUser);
        })
      );
    }),
    catchError((err) => {
      return throwError(err);
    })
  );

  existingUser$.subscribe({
    next: () => {
      res.send("User added successfully");
    },
    error: (err: Error) => {
      console.log(err);
      if (err.message === "User not found") {
        res.status(404).send("User not found");
      } else if (err.message === "Email already in use") {
        res.status(400).send("Email already in use");
      } else {
        res.status(400).send("Error adding user");
      }
    },
  });
});

export default router;
