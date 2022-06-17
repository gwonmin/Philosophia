import { Schema, model } from "mongoose";

const AristotleSchema = new Schema({
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
            ref: 'AristotleComment' // 댓글 스키마 참조
        }
    ],
    },
    {
        timestamps: true,
    }
);

const AristotleModel = model("Aristotle", AristotleSchema);

export { AristotleModel };