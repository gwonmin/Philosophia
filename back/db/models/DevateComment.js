import mongoose from 'mongoose';
import { DevateCommentModel } from "../schemas/devatecomment";
import { DevateModel } from "../schemas/devate";
import { userModel } from "../schemas/user";

class DevateComment {
    static async createComment({ author, postId, content }) {
        const newComment = { author, postId, content };
        // newComment.author = newComment.author.name
        const createdNewComment = await DevateCommentModel.create(newComment);
        const id = mongoose.Types.ObjectId(postId);
        await DevateModel.findOneAndUpdate(
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
        const filter = { _id: commentId};
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        
        const comment = await DevateCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ comment }) {
        const deletedComment = await DevateCommentModel.deleteOne({ 
            _id: comment._id
         });
        await DevateModel.findOneAndUpdate(
            { _id: comment.postId },
            {
              $pull: {
                comment: comment._id,
              }
            }
          );
        return deletedComment;
    }

    static async findByCommentId({ commentId }) {
        const comment = await DevateCommentModel.findOne({ _id: commentId });

        await userModel.populate(comment, {
            path: 'author',
            select: 'id email name',
        });
        return comment;
    }

    static async findByPostId({ postId }){
        const comments = await DevateCommentModel.find({ postId });        
        
        await userModel.populate(comments, {
            path: 'author',
            select: 'id email name',
        });
        
        return comments;
    }

    
}

export { DevateComment };