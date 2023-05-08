import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * Interface describing the document structure for a User document.
 *
 * @interface IUser
 * @interface IUser
 * @extends {Document}
 * @group User
 */
export interface IUser {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  surname?: string;
  email: string;
  password: string;
  location?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    address?: string;
  };
  phoneNumber?: string;
  profilePic?: string;
  date?: Date;
  stables?: mongoose.Schema.Types.ObjectId[];
}

/**
 * Mongoose schema for a User document.
 * 
 * @const UserSchema
 * @type {Schema}
 * @exports UserSchema
 * @group User
 */
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: {
    street: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    postalCode: { type: String, required: false },
    country: { type: String, required: false },
    address: { type: String, required: false },
  },
  phoneNumber: { type: String, required: false },
  profilePic: { type: String, required: false, default: "../../../public/img/defaultUser.png" }, // Default profile picture
  date: { type: Date, default: Date.now },
  stables: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stable",
    required: false,
  }],
});

const UserModel = mongoose.model<IUser>("User", UserSchema);

export { UserModel, UserSchema };
