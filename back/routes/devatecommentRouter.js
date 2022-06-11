import { Router } from "express";
import { devatecommentService } from "../services/devatecommentService"; 
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

const devatecommentRouter = Router();

// 댓글 작성
devatecommentRouter.post('/devatecomments', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const postId = req.query.postId;
        const { content } = req.body;

        const newComment = await devatecommentService.addComment({
            userId,
            postId,
            content
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
devatecommentRouter.put('/devatecomments/:id', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const commentId = req.params.id;
        const content = req.body.content ?? null;

        const toUpdate = { content };
        const updatedComment = await devatecommentService.setComment({
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
devatecommentRouter.delete('/devatecomments/:id', verifyToken, async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await devatecommentService.deleteComment({
            commentId,
        });

        if (deletedComment.errorMessage) {
            throw new Error(deletedComment.errorMessage);
        }
        res.status(200).send(deletedComment);
    } catch (error) {
        next(error);
    }
})

// 게시글 1개 전체 댓글 조회
devatecommentRouter.get('/devatecommentlist', verifyToken, async (req, res, next) => {
    try {
        const postId = req.query.postId;
        const comments = await devatecommentService.getComments({ postId });

        res.status(200).send(comments);
    } catch (error) {
        next(error);
    }
})

/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
devatecommentRouter.get("/refresh", verifyRefresh);

export { devatecommentRouter };