import mongoose from 'mongoose';
import { FreeTopicCommentModel } from '../schemas/freetopiccomment';
import { FreeTopicModel } from '../schemas/freetopic';
import { userModel } from '../schemas/user';

class FreeTopicComment {
  static async createComment({ author, postId, content }) {
    const newComment = { author, postId, content };
    const createdNewComment = await FreeTopicCommentModel.create(newComment);
    const id = mongoose.Types.ObjectId(postId);
    await FreeTopicModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          comment: createdNewComment._id,
        },
      }
    );
    return createdNewComment;
  }

  static async update({ commentId, newValues }) {
    const filter = { _id: commentId };
    const update = { $set: newValues };
    const option = { returnOriginal: false };

    const comment = await FreeTopicCommentModel.findOneAndUpdate(filter, update, option);
    return comment;
  }

  static async delete({ comment }) {
    const deletedComment = await FreeTopicCommentModel.deleteOne({
      _id: comment._id,
    });
    await FreeTopicModel.findOneAndUpdate(
      { _id: comment.postId },
      {
        $pull: {
          comment: comment._id,
        },
      }
    );
    return deletedComment;
  }

  static async findByCommentId({ commentId }) {
    const comment = await FreeTopicCommentModel.findOne({ _id: commentId });

    await userModel.populate(comment, {
      path: 'author',
      select: 'id email name',
    });
    return comment;
  }

  static async findByPostId({ postId }) {
    const comments = await FreeTopicCommentModel.find({ postId });

    await userModel.populate(comments, {
      path: 'author',
      select: 'id email name',
    });

    return comments;
  }
}

export { FreeTopicComment };
