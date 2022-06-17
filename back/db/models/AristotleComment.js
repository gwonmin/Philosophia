import { AristotleCommentModel } from "../schemas/aristotlecomment";
import { userModel } from "../schemas/user";

class AristotleComment{
    static async createComment({ author, postId, content }){
        const newComment = { author, postId, content };
        const createdNewComment = await AristotleCommentModel.create(newComment);
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