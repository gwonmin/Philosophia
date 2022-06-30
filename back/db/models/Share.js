import { ShareModel } from '../schemas/share';
import { userModel } from '../schemas/user';

class Share {
  static async create({ newShare }) {
    const createdNewShare = await ShareModel.create(newShare);
    return createdNewShare;
  }

  static async update({ shareId, newValues }) {
    const filter = { _id: shareId };
    const update = { $set: newValues };
    const option = { returnOriginal: false };
    const updatedShare = await ShareModel.findOneAndUpdate(filter, update, option);
    return updatedShare;
  }

  static async findByShareId({ shareId }) {
    const share = await ShareModel.findOne({ _id: shareId }).populate('author', 'id name');
    return share;
  }

    // userId로 게시글 검색
    static async findByUserId({ userId }){
      const posts = await ShareModel.find({ author: userId });
      return posts;
  }

  static async findAll() {
    const shares = await ShareModel.find().sort({createdAt: -1 });
    return shares;
  }

  static async delete({ shareId }) {
    const deletedShare = await ShareModel.deleteOne({ _id: shareId });
    return deletedShare;
  }

  static async findLike({ shareId, userId }) {
    const share = await ShareModel.findOne({ _id: shareId }, { like: { $elemMatch: { $eq: userId } } });
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
