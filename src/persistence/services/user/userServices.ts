import mongoose from "mongoose";
import { IUser, UserModel } from "../../models/User";

class UserServices {
  private userify(name: string, email: string, password: string): IUser {
    return {
      //@ts-ignore
      _id: new mongoose.Types.ObjectId(),
      name: name,
      surname: "",
      email: email,
      password: password,
      location: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        address: "",
      },
      phoneNumber: "",
      profilePic: "",
      date: new Date(),
      //@ts-ignore
      stables: [],
    };
  }

  private createUser(user: IUser): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {
      UserModel.create(user)
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public createUserRequest(name: string, email: string, password: string) {
    return new Promise<IUser>((resolve, reject) => {
      this.createUser(this.userify(name, email, password))
        .then((user) => {
          resolve(user);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

const userServices = new UserServices();
export default userServices;
