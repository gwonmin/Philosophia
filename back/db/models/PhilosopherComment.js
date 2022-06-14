import { PhilosopherCommentModel } from "../schemas/philosophercomment";
import { userModel } from "../schemas/user";

class PhilosopherComment{
    static async createComment({ author, postId, content }){
        const newComment = { author, postId, content };
        const createdNewComment = await PhilosopherCommentModel.create(newComment);
        return createdNewComment;
    };

    static async findByCommentId({ commentId }){
        const comment = await PhilosopherCommentModel.findOne({ _id: commentId });

        await userModel.populate(comment, {
            path: 'author',
            select: 'id email name',
        });
        return comment;
    };

    static async findByPostId({ postId }){
        const comments = await PhilosopherCommentModel.find({ postId });
        return comments;
    };

    static async update({ commentId, newValues }){
        const filter = { _id: commentId};
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        
        const comment = await PhilosopherCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ commentId }){
        const deletedComment = await PhilosopherCommentModel.deleteOne({ _id: commentId });
        return deletedComment;
    }
}

export { PhilosopherComment };