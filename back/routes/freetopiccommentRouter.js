import { Router } from 'express';
import { freetopiccommentService } from '../services/freetopiccommentService';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyRefresh } from '../middlewares/verifyRefresh';

const freetopiccommentRouter = Router();

// 댓글 작성
freetopiccommentRouter.post('/freetopiccomments', verifyToken, async (req, res, next) => {
  try {
    const userId = req.user;
    const postId = req.query.postId;
    const { content } = req.body;

    const newComment = await freetopiccommentService.addComment({
      userId,
      postId,
      content,
    });

    if (newComment.errorMessage) {
      throw new Error(newComment.errorMessage);
    }

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});

// 댓글 수정
freetopiccommentRouter.put('/freetopiccomments/:id', verifyToken, async (req, res, next) => {
  try {
    const userId = req.user;
    const commentId = req.params.id;
    const content = req.body.content ?? null;

    const toUpdate = { content };
    const updatedComment = await freetopiccommentService.setComment({
      userId,
      commentId,
      toUpdate,
    });

    if (updatedComment.errorMessage) {
      throw new Error(updatedComment.errorMessage);
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    next(error);
  }
});

// 댓글 삭제
freetopiccommentRouter.delete('/freetopiccomments/:id', verifyToken, async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await freetopiccommentService.deleteComment({
      commentId,
    });

    if (deletedComment.errorMessage) {
      throw new Error(deletedComment.errorMessage);
    }
    res.status(200).send(deletedComment);
  } catch (error) {
    next(error);
  }
});

// 댓글 1개 조회
freetopiccommentRouter.get('/freetopiccomments/:id', async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await freetopiccommentService.getComment({ commentId });

    res.status(200).send(comment);
  } catch (error) {
    next(error);
  }
});

// 게시글 1개 전체 댓글 조회
freetopiccommentRouter.get('/freetopiccommentlist', async (req, res, next) => {
  try {
    const postId = req.query.postId;
    const comments = await freetopiccommentService.getComments({ postId });

    res.status(200).send(comments);
  } catch (error) {
    next(error);
  }
});

/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
freetopiccommentRouter.get('/refresh', verifyRefresh);

export { freetopiccommentRouter };
