import { Schema, model } from "mongoose";

const DescartesCommentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User', // 유저 스키마 참조
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
    {
        versionKey: false 
    }
);

const DescartesCommentModel = model('Descartescomment', DescartesCommentSchema);

export { DescartesCommentModel };