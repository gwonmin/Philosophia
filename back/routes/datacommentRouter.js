import { Router } from "express";
import { datacommentService } from "../services/datacommentService"; 
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

const datacommentRouter = Router();

// 댓글 작성
datacommentRouter.post('/datacomments', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const postId = req.query.postId;
        const { content } = req.body;

        const newComment = await datacommentService.addComment({
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
datacommentRouter.put('/datacomments/:id', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const commentId = req.params.id;
        const content = req.body.content ?? null;

        const toUpdate = { content };
        const updatedComment = await datacommentService.setComment({
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
datacommentRouter.delete('/datacomments/:id', verifyToken, async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await datacommentService.deleteComment({
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
datacommentRouter.get('/datacommentlist', verifyToken, async (req, res, next) => {
    try {
        const postId = req.query.postId;
        const comments = await datacommentService.getComments({ postId });

        res.status(200).send(comments);
    } catch (error) {
        next(error);
    }
})

export { datacommentRouter };