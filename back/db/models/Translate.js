import { TranslateModel } from "../schemas/translate";

class Translate {
    static async create({text, afterText}) {
        const createdNewText = await TranslateModel.create({ text, afterText });
        return createdNewText;
    }
}

export { Translate };