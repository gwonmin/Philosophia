import { Schema, model } from "mongoose";

const DescartesSchema = new Schema({
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
            ref: 'DescartesComment' // 댓글 스키마 참조
        }
    ],
    },
    {
        timestamps: true,
    }
);

const DescartesModel = model("Descartes", DescartesSchema);

export { DescartesModel };