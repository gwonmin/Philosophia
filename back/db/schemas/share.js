import { Schema, model } from "mongoose";

const ShareSchema = new Schema(
    {
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
            required: true
        },
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ShareComment' // 댓글 스키마 참조
            }
        ],
    },
    {
        timestamps: true,
    },
    {
        versionKey: false 
    }
)

const ShareModel = model('Share', ShareSchema);

export { ShareModel };