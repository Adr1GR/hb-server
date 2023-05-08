import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * Interface describing the document structure for a Stable document.
 * 
 * @interface IStable
 * @returns IStable
 * @exports IStable
 */
export interface IStable {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  location?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    address: string;
  };
  owner?: mongoose.Schema.Types.ObjectId;
  horses?: mongoose.Schema.Types.ObjectId[];
  date?: Date;
}

/**
 * Mongoose schema for a Stable document.
 * 
 * @const StableSchema
 * @type {Schema}
 * @exports StableSchema
 */
const StableSchema: Schema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  location: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: false },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: true,
  },
  horses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Horse" }],
  date: { type: Date, default: Date.now },
});

/**
 * Mongoose model for a Stable document.
 */
const StableModel: Model<IStable> = mongoose.model<IStable>("Stable", StableSchema);

export { StableModel, StableSchema };
