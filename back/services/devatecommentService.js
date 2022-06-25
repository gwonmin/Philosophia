import { Devate, DevateComment, User } from '../db';

class devatecommentService {
    static async addComment({ userId, postId, content }) {
        const author = await User.findById({ userId });
        const yes = await DevateComment.findYeses({ postId });
        const no = await DevateComment.findNos({ postId });
        let stance;
        if (yes.includes(author._id)) {
            stance = 'yes'
        } else if (no.includes(author._id)) {
            stance = 'no'
        } else {
            stance = '투표를 하지 않았습니다'
        }

        const createNewComment = await DevateComment.createComment({ author, postId, content, stance });


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
        const deletedComment = await DevateComment.delete({ comment });
        return deletedComment;
    }

    // 1개 댓글
    static async getComment({ commentId }) {
        const comment = await DevateComment.findByCommentId({ commentId });
        const author = await DevateComment.findAuthor({ commentId });
        const postId = await DevateComment.findPost({ commentId });
        const yes = await DevateComment.findYeses({ postId });
        const no = await DevateComment.findNos({ postId });
        // console.log("yes: ",yes)
        // console.log("no: ",no)
        // console.log("author: ", author);
        if (yes.includes(author)) {
            comment.stance = 'yes'
        } else if (no.includes(author)) {
            comment.stance = 'no'
        } else {
            comment.stance = '투표를 하지 않았습니다.'
        }

        return comment;
    }

    // 게시글의 모든 댓글
    static async getComments({ postId }) {
        const comments = await DevateComment.findByPostId({ postId });
        return comments
    }

}

export { devatecommentService }
