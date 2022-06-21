import { Schema, model } from "mongoose";

const dataSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // 유저 스키마 참조
        required: true,
    },title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
},
    {
        // createdAt, updatedAt 자동 생성
    timestamps: true,
    }
);

const DataModel = model("Data", dataSchema);

export { DataModel };
