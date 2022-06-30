import { TranslateModel } from "../schemas/translate";

class Translate {
    static async create({text, afterText}) {
        const createdNewText = await TranslateModel.create({ text, afterText });
        return createdNewText;
    }

    static async createOnlyText({text}) {
        const createdOnlyText = await TranslateModel.create({ text });
        return createdOnlyText;
    }
}

export { Translate };