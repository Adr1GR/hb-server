import mongoose from "mongoose";
import { IStable, StableModel } from "../../models/Stable";
import jwt from "jsonwebtoken";
import { StableRepository } from "../../repositories/stableRepo";

require("dotenv").config();
const JWT_SECRET: any = process.env.JWT_SECRET;

class StableServices {
  private stableify(
    _id: mongoose.Types.ObjectId,
    name: string,
    street: string,
    city: string,
    postalCode: string,
    country: string,
    address: string,
    owner: mongoose.Types.ObjectId,
    pictures?: string[],
    state?: string
  ): IStable {
    return {
      //@ts-ignore
      _id: _id,
      name: name,
      location: {
        street: street,
        city: city,
        state: "",
        postalCode: postalCode,
        country: country,
        address: address,
      },
      pictures: pictures,
      //@ts-ignore
      owner: owner,
      horses: [],
      date: new Date(),
    };
  }

  private createStable(stable: IStable): Promise<IStable> {
    return new Promise<IStable>((resolve, reject) => {
      StableModel.create(stable)
        .then((stable) => {
          resolve(stable);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  public createStableRequest(
    _id: mongoose.Types.ObjectId,
    name: string,
    street: string,
    city: string,
    postalCode: string,
    country: string,
    address: string,
    owner: mongoose.Types.ObjectId,
    pictures?: string[],
    state?: string
  ) {

    return new Promise<IStable>((resolve, reject) => {
      this.createStable(
        this.stableify(
          _id,
          name,
          street,
          city,
          postalCode,
          country,
          address,
          owner,
          pictures,
          state
        )
      )
        .then((stable) => {
          resolve(stable);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

const stableServices = new StableServices();
export default stableServices;
