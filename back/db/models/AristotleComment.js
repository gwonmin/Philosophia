import mongoose from 'mongoose';
import { AristotleCommentModel } from "../schemas/aristotlecomment";
import { AristotleModel } from "../schemas/aristotle";
import { userModel } from "../schemas/user";

class AristotleComment{
    static async createComment({ author, postId, content }){
        const newComment = { author, postId, content };
        // newComment.author = newComment.author.name
        const createdNewComment = await NietzscheCommentModel.create(newComment);
        const id = mongoose.Types.ObjectId(postId);
        await AristotleModel.findOneAndUpdate(
        { _id: id },
        {
            $push: {
            comment: createdNewComment._id,
            },
        }
        );
        return createdNewComment;
    };

    static async findByCommentId({ commentId }){
        const comment = await AristotleCommentModel.findOne({ _id: commentId });

        await userModel.populate(comment, {
            path: 'author',
            select: 'id email name',
        });
        return comment;
    };

    static async findByPostId({ postId }){
        const comments = await AristotleCommentModel.find({ postId });

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
        
        const comment = await AristotleCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ commentId }){
        const deletedComment = await AristotleCommentModel.deleteOne({ _id: commentId });
        return deletedComment;
    }
}

export { AristotleComment };