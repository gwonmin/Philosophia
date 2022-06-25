import { Schema, model } from "mongoose";

const TranslateSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        afterText: {
            type: String,
        }
    }
)
    

const TranslateModel = model('Translate', TranslateSchema);

export { TranslateModel };