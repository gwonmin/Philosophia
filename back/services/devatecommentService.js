import { DevateComment, User } from '../db';

class devatecommentService {
    static async addComment({ userId, postId, content }) {
        const author = await User.findById({ userId });
        const createNewComment = await DevateComment.createComment({ author, postId, content });
        return createNewComment;
    }

    static async setComment({ userId, commentId, toUpdate }) {
        let comment = await DevateComment.findByCommentId({ commentId });
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
        comment = await DevateComment.update({ commentId, newValues });

        return comment
    }

    static async deleteComment({ commentId }) {
        const comment = await DevateComment.findByCommentId({ commentId });
        if (!comment) {
            const errorMessage = '해당 댓글이 없습니다.';
            return { errorMessage };
        }
        const deletedComment = await DevateComment.delete({ commentId });
        return deletedComment;
    }

    // 1개 댓글
    static async getComment({ commentId }) {
        const comment = await DevateComment.findByCommentId({ commentId });
        return comment;
    }

    // 게시글의 모든 댓글
    static async getComments({ postId }) {
        const comments = await DevateComment.findByPostId({ postId });
        return comments
    }

}

export { devatecommentService }
