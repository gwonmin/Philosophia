import { FreeTopicModel } from '../schemas/freetopic';
import { FreeTopicCommentModel } from '../schemas/freetopiccomment';
import { userModel } from '../schemas/user';

class FreeTopic {
  static async create({ newPost }) {
    const createdNewPost = await FreeTopicModel.create(newPost);
    return createdNewPost;
  }

  static async findByPostId({ postId }) {
    const post = await FreeTopicModel.findOne({ _id: postId }).populate('author', 'id name');
    const comment = await FreeTopicCommentModel.find({ postId: postId }).populate('author', 'id name');
    post.comment = comment;
    return post;
  }

  static async findAll() {
    const posts = await FreeTopicModel.find().populate('author', 'id name');
    return posts;
  }

  static async update({ postId, newValues }) {
    const filter = { _id: postId };
    const update = { $set: newValues };
    const option = { returnOriginal: false };
    const updatedPost = await FreeTopicModel.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }

  static async delete({ postId }) {
    const deletedPost = await FreeTopicModel.deleteOne({ _id: postId });
    return deletedPost;
  }
}

export { FreeTopic };
