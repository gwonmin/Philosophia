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

  static async getTop3(){
    // 게시물 조회수로 내림차순 정렬하고 조회수가 같다면 댓글 수로 내림차순, 댓글 수도 같다면 _id를 기준으로 오름차순 정렬
    const posts = await FreeTopicModel.find().sort({"visited":-1, "comment":-1, "_id":1}).limit(3);
    return posts;
  }
}

export { FreeTopic };
