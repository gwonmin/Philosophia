import { PhilosopherComment, User } from "../db/";

class philosophercommentService{
    static async addComment({ userId, postId, content }){
        const author = await User.findById({ userId });
        const createNewComment = await PhilosopherComment.createComment({ author, postId, content });
        return createNewComment;
    }

    static async getComments({ postId }){
        const comments = await PhilosopherComment.findByPostId({ postId });
        return comments;
    }

    static async setComment({ userId, commentId, toUpdate }){
        let comment = await PhilosopherComment.findByCommentId({ commentId });
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
        comment = await PhilosopherComment.update({ commentId, newValues });

        return comment;
    }

    static async deleteComment({ commentId }){
        const comment = await PhilosopherComment.findByCommentId({ commentId });
        if (!comment) {
            const errorMessage = '해당 댓글이 없습니다.';
            return { errorMessage };
        }
        const deletedComment = await PhilosopherComment.delete({ commentId });
        return deletedComment;

    }
}

export { philosophercommentService };