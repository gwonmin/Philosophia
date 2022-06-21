import mongoose from 'mongoose';
import { PhilosopherCommentModel } from "../schemas/philosophercomment";
import { PhilosopherModel } from "../schemas/philosopher";
import { userModel } from "../schemas/user";

class PhilosopherComment{
    static async createComment({ author, postId, content }) {
        const newComment = { author, postId, content };
        // newComment.author = newComment.author.name
        const createdNewComment = await PhilosopherCommentModel.create(newComment);
        const id = mongoose.Types.ObjectId(postId);
        await PhilosopherModel.findOneAndUpdate(
        { _id: id },
        {
            $push: {
            comment: createdNewComment._id,
            },
        }
        );
        return createdNewComment;
    }


    static async findByCommentId({ commentId }){
        const comment = await PhilosopherCommentModel.findOne({ _id: commentId });

        await userModel.populate(comment, {
            path: 'author',
            select: 'id name',
        });
        return comment;
    };

    static async findByPostId({ postId }){
        const comments = await PhilosopherCommentModel.find({ postId });

        await userModel.populate(comments, {
            path: 'author',
            select: 'id name',
        });

        return comments;
    };

    static async update({ commentId, newValues }){
        const filter = { _id: commentId};
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        
        const comment = await PhilosopherCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ comment }) {
        const deletedComment = await PhilosopherCommentModel.deleteOne({ 
            _id: comment._id
         });
        await PhilosopherModel.findOneAndUpdate(
            { _id: comment.postId },
            {
              $pull: {
                comment: comment._id,
              }
            }
          );
        return deletedComment;
    }


}

export { PhilosopherComment };