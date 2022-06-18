import mongoose from 'mongoose';
import { NietzscheCommentModel } from "../schemas/nietzschecomment";
import { NietzscheModel } from "../schemas/nietzsche";
import { userModel } from "../schemas/user";

class NietzscheComment{
    static async createComment({ author, postId, content }) {
        const newComment = { author, postId, content };
        // newComment.author = newComment.author.name
        const createdNewComment = await NietzscheCommentModel.create(newComment);
        const id = mongoose.Types.ObjectId(postId);
        await NietzscheModel.findOneAndUpdate(
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
        const comment = await NietzscheCommentModel.findOne({ _id: commentId });

        await userModel.populate(comment, {
            path: 'author',
            select: 'id email name',
        });
        return comment;
    };

    static async findByPostId({ postId }){
        const comments = await NietzscheCommentModel.find({ postId });

        await userModel.populate(comments, {
            path: 'author',
            select: 'id email name',
        });

        return comments;
    };

    static async update({ commentId, newValues }){
        const filter = { _id: commentId};
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        
        const comment = await NietzscheCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ comment }) {
        const deletedComment = await NietzscheCommentModel.deleteOne({ 
            _id: comment._id
         });
        await NietzscheModel.findOneAndUpdate(
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

export { NietzscheComment };