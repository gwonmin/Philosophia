import { NietzscheCommentModel } from "../schemas/nietzschecomment";
import { userModel } from "../schemas/user";

class NietzscheComment{
    static async createComment({ author, postId, content }){
        const newComment = { author, postId, content };
        const createdNewComment = await NietzscheCommentModel.create(newComment);
        return createdNewComment;
    };

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
        return comments;
    };

    static async update({ commentId, newValues }){
        const filter = { _id: commentId};
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        
        const comment = await NietzscheCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ commentId }){
        const deletedComment = await NietzscheCommentModel.deleteOne({ _id: commentId });
        return deletedComment;
    }
}

export { NietzscheComment };