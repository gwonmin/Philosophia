import { Schema, model } from "mongoose";

const DataCommentSchema = new Schema(
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

const DataCommentModel = model('Datacomment', DataCommentSchema);

export { DataCommentModel };