import { AristotleComment, User } from "../db/";

class aristotlecommentService{
    static async addComment({ userId, postId, content }){
        const author = await User.findById({ userId });
        const createNewComment = await AristotleComment.createComment({ author, postId, content });
        return createNewComment;
    }

    static async getComments({ postId }){
        const comments = await AristotleComment.findByPostId({ postId });
        return comments;
    }

    static async setComment({ userId, commentId, toUpdate }){
        let comment = await AristotleComment.findByCommentId({ commentId });
        const author = await User.findById({ userId });

        if (!comment) {
            const errorMessage = '댓글 내역이 없습니다.';
            return { errorMessage };
        }
        if (author.id != comment.author.id) {
            const errorMessage = '자신의 댓글만 수정할 수 있습니다.';
            return { errorMessage };
        }

        if (!toUpdate.content) {
            toUpdate.content = comment.content;
        }

        const newValues = {
            content: toUpdate.content,
        };
        comment = await AristotleComment.update({ commentId, newValues });

        return comment;
    }

    static async deleteComment({ commentId }){
        const comment = await AristotleComment.findByCommentId({ commentId });
        if (!comment) {
            const errorMessage = '해당 댓글이 없습니다.';
            return { errorMessage };
        }
        const deletedComment = await AristotleComment.delete({ comment });
        return deletedComment;

    }
}

export { aristotlecommentService };