import { ShareModel } from "../schemas/share";
import { userModel } from "../schemas/user";

class Share {
    static async create({ newShare }) {
        const createdNewShare = await ShareModel.create(newShare);
        return createdNewShare;
    } 

    static async findByShareId({ shareId }) {
        const share = await ShareModel.findOne({ _id: shareId });
        return share;
    }

    static async findAll() {
        const shares = await ShareModel.find();
        return shares;
    }

    static async delete({ shareId }) {
        const deletedShare = await ShareModel.deleteOne({ _id: shareId });
        return deletedShare;
    }

    static async findLike({ shareId, userId }) {
        const share = await ShareModel.findOne({ _id: shareId }, 
        { like: { $elemMatch: { $eq: userId } } });
        return share.like;
    }

    static async updateLike({ shareId, userId, newValues }) {
        const filter = { _id: shareId };
        const update = newValues;
        const option = { returnOriginal: false };
        const updatedShare = await ShareModel.findOneAndUpdate(filter, update, option);
        return updatedShare;
    }
}

export { Share };