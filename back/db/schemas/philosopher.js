import { Schema, model } from "mongoose";

const PhilosopherSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // 유저 스키마 참조
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PhilosopherComment' // 댓글 스키마 참조
        }
    ],
    },
    {
        timestamps: true,
    }
);

const PhilosopherModel = model("Philosopher", PhilosopherSchema);

export { PhilosopherModel };