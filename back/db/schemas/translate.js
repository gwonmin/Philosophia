import { Schema, model } from "mongoose";

const TranslateSchema = new Schema(
    {   
        text: {
            type: String,
        },
        afterText: {
            type: String,
        }
    },
    {
        timestamps: true,
      },
)
    

const TranslateModel = model('Translate', TranslateSchema);

export { TranslateModel };