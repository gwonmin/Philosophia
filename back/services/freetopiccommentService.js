import { FreeTopicComment, User } from '../db';

class freetopiccommentService {
  static async addComment({ userId, postId, content }) {
    const author = await User.findById({ userId });
    const createNewComment = await FreeTopicComment.createComment({ author, postId, content });
    return createNewComment;
  }

  static async setComment({ userId, commentId, toUpdate }) {
    let comment = await FreeTopicComment.findByCommentId({ commentId });
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
    comment = await FreeTopicComment.update({ commentId, newValues });

    return comment;
  }

  static async deleteComment({ commentId }) {
    const comment = await FreeTopicComment.findByCommentId({ commentId });
    if (!comment) {
      const errorMessage = '해당 댓글이 없습니다.';
      return { errorMessage };
    }
    const deletedComment = await FreeTopicComment.delete({ comment });
    return deletedComment;
  }

  // 1개 댓글
  static async getComment({ commentId }) {
    const comment = await FreeTopicComment.findByCommentId({ commentId });
    return comment;
  }

  // 게시글의 모든 댓글
  static async getComments({ postId }) {
    const comments = await FreeTopicComment.findByPostId({ postId });
    return comments;
  }
}

export { freetopiccommentService };
