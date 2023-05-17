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
    description?: string;
    breed: string;
    yearOfBirth?: number;
    countryOfBirth?: string;
    age: number;
    gender: string;
    color?: string;
    height?: number;
    weight?: number;
    offspring?: mongoose.Schema.Types.ObjectId[];
    pictures?: string[];
    owner: {
        _id?: mongoose.Schema.Types.ObjectId;
        name: string;
    };
    stables?: mongoose.Schema.Types.ObjectId[];
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
    yearOfBirth: { type: Number, required: false },
    countryOfBirth: { type: String, required: false },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    color: { type: String, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    pictures: [{ type: String, required: false }],
    owner: {
        _id: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
    },
    stables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stable" }],
    offspring: [{ type: mongoose.Schema.Types.ObjectId, ref: "Horse" }],
});

const HorseModel = mongoose.model<IHorse>("Horse", HorseSchema);

export { HorseModel, HorseSchema };
