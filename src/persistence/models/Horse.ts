import mongoose, { Document, Model, Schema } from "mongoose";

export interface IHorse {
    _id?: mongoose.Schema.Types.ObjectId;
    name: string;
    breed: string;
    age: number;
    owner: mongoose.Schema.Types.ObjectId;
    farms?: mongoose.Schema.Types.ObjectId[];
    offspring?: mongoose.Schema.Types.ObjectId[];
}

const HorseSchema: Schema = new Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
    },
    farms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Farm" }],
    offspring: [{ type: mongoose.Schema.Types.ObjectId, ref: "Horse" }],
});

const HorseModel = mongoose.model<IHorse>("Horse", HorseSchema);

export { HorseModel, HorseSchema };
