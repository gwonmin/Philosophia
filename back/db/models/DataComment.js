import { DataCommentModel } from "../schemas/datacomment";
import { userModel } from "../schemas/user";

class DataComment{
    static async createComment({ author, postId, content }){
        const newComment = { author, postId, content };
        const createdNewComment = await DataCommentModel.create(newComment);
        return createdNewComment;
    };

    static async findByCommentId({ commentId }){
        const comment = await DataCommentModel.findOne({ _id: commentId });

        await userModel.populate(comment, {
            path: 'author',
            select: 'id email name',
        });
        return comment;
    };

    static async findByPostId({ postId }){
        const comments = await DataCommentModel.find({ postId });
        return comments;
    };

    static async update({ commentId, newValues }){
        const filter = { _id: commentId};
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        
        const comment = await DataCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ commentId }){
        const deletedComment = await DataCommentModel.deleteOne({ _id: commentId });
        return deletedComment;
    }
}

export { DataComment };