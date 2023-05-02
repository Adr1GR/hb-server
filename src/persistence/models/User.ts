import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  surname?: string;
  email: string;
  password: string;
  location?: {
    name: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
  };
  phoneNumber?: string;
  profilePic?: string;
  date?: Date;
  farm?: mongoose.Schema.Types.ObjectId;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    name: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    postalCode: { type: String, required: false },
  },
  phoneNumber: { type: String, required: false },
  profilePic: { type: String, required: false, default: "shorturl.at/iFZ35" }, // Default profile picture
  date: { type: Date, default: Date.now },
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: false,
  },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export { UserModel, UserSchema };
