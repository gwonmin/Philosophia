import { Schema, model } from "mongoose";

const authSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    hashedAuthNum: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 180,
    }
});

const authModel = model("Auth", authSchema);

export { authModel };