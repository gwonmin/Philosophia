const { DevateCommentModel } = require('../schemas/devatecomment');
const { DevateModel } = require('../schemas/devate');
// const { UserModel } 유저 모델 import
class DevateComment {
    static async createComment({ author, postId, content }) {
        const newComment = { author, postId, content };
        const createdNewComment = await DevateCommentModel.create(newComment);
        return createdNewComment;
    }

    static async update({ commentId, newValues }) {
        const filter = { _id: commentId};
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        
        const comment = await DevateCommentModel.findOneAndUpdate(filter, update, option);
        return comment;
    }

    static async delete({ commentId }) {
        const deletedComment = await DevateCommentModel.deleteOne({ _id: commentId });
        return deletedComment;
    }

    static async findByCommentId({ commentId }) {
        const comment = await DevateCommentModel.findOne({ _id: commentId });

        await UserModel.populate(comment, {
            path: 'author',
            select: 'id email name',
        });
        return comment;
    }

    static async findByPostId({ postId }){
        const comments = await DevateCommentModel.find({ postId });
        return comments;
    }

    
}