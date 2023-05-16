import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * Interface describing the document structure for a Horse document.
 * 
 * @interface IHorse
 * @returns IHorse
 * @exports IHorse
 */
export interface IHorse {
    _id?: mongoose.Schema.Types.ObjectId;
    name: string;
    breed: string;
    age: number;
    gender: string;
    owner: mongoose.Schema.Types.ObjectId;
    stables?: mongoose.Schema.Types.ObjectId[];
    offspring?: mongoose.Schema.Types.ObjectId[];
    pictures?: string[];
}

/**
 * Mongoose schema for a Horse document.
 * 
 * @const HorseSchema
 * @type {Schema}
 * @exports HorseSchema
 */
const HorseSchema: Schema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
    },
    stables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stable" }],
    offspring: [{ type: mongoose.Schema.Types.ObjectId, ref: "Horse" }],
    pictures: [{ type: String, required: false }],
});

const HorseModel = mongoose.model<IHorse>("Horse", HorseSchema);

export { HorseModel, HorseSchema };
