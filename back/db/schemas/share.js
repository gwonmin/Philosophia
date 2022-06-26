import { Schema, model } from "mongoose";

const ShareSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User', // 유저 스키마 참조
            required: true,
        },
        philosopher: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        like: [{ type: String }],
        likeCount: {
            type: Number,
            default: 0
        },
        userLike: {
            type: String,
        }
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