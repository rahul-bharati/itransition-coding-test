import {model, Schema, Types} from "mongoose";
import {IDrug} from "../interface/drug";

const drugSchema = new Schema<IDrug>({
    code: {type: String, required: true, unique: true},
    genericName: {type: String, required: true},
    company: {type: String, required: true},
    brandName: {type: String, required: true},
    launchDate: {type: Date, required: true}
}, {timestamps: true});

const Drug = model<IDrug>('Drug', drugSchema);

export default Drug;