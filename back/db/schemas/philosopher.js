import { Schema, model } from "mongoose";

const PhilosopherSchema = new Schema({
    philosopherName:{
        type: String,
        required: true,
    },
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
            ref: 'NietzscheComment' // 댓글 스키마 참조
        }
    ],
    },
    {
        timestamps: true,
    },
    {
        versionKey: false,
    }
    
);

const PhilosopherModel = model("Philosopher", PhilosopherSchema);

export { PhilosopherModel };