import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * Interface describing the document structure for a Farm document.
 * 
 * @interface IFarm
 * @returns IFarm
 * @exports IFarm
 */
export interface IFarm extends Document {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  location?: {
    name: string;
    country: string;
    city: string;
    address: string;
    postalCode: string;
  };
  owner: mongoose.Schema.Types.ObjectId;
  horses?: mongoose.Schema.Types.ObjectId[];
  date?: Date;
}

/**
 * Mongoose schema for a Farm document.
 * 
 * @const FarmSchema
 * @type {Schema}
 * @exports FarmSchema
 */
const FarmSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: {
    name: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    postalCode: { type: String, required: false },
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
 * Mongoose model for a Farm document.
 */
const FarmModel: Model<IFarm> = mongoose.model<IFarm>("Farm", FarmSchema);

export { FarmModel, FarmSchema };
