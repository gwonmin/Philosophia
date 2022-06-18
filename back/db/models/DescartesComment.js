import mongoose from 'mongoose';
import { DescartesCommentModel } from "../schemas/descartescomment";
import { DescartesModel } from "../schemas/descartes";
import { userModel } from "../schemas/user";

class DescartesComment{
    static async createComment({ author, postId, content }){
        const newComment = { author, postId, content };
        // newComment.author = newComment.author.name
        const createdNewComment = await NietzscheCommentModel.create(newComment);
        const id = mongoose.Types.ObjectId(postId);
        await DescartesModel.findOneAndUpdate(
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
        const comment = await DescartesCommentModel.findOne({ _id: commentId });

        await userModel.populate(comment, {
            path: 'author',
            select: 'id email name',
        });
        return comment;
    };

    static async findByPostId({ postId }){
        const comments = await DescartesCommentModel.find({ postId });

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
        
        const comment = await DescartesCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ commentId }){
        const deletedComment = await DescartesCommentModel.deleteOne({ _id: commentId });
        return deletedComment;
    }
}

export { DescartesComment };