import { Router } from "express";
import { philosophercommentService } from "../services/philosophercommentService";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

const philosophercommentRouter = Router();

// 니체 게시판 댓글 작성
philosophercommentRouter.post("/nietzschecomments", verifyToken, async function(req, res, next){
    try {
        const userId = req.user;
        const postId = req.query.postId;
        const { content } = req.body;

        const newComment = await philosophercommentService.addComment({
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

// 니체 게시판 게시글 1개 댓글 조회
philosophercommentRouter.get('/nietzschecommentlist', verifyToken, async (req, res, next) => {
    try {
        const postId = req.query.postId;
        const comments = await philosophercommentService.getComments({ postId });

        res.status(200).send(comments);
    } catch (error) {
        next(error);
    }
});

//니체 게시판 댓글 수정
philosophercommentRouter.put('/nietzschecomments/:id', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const commentId = req.params.id;
        const content = req.body.content ?? null;

        const toUpdate = { content };
        const updatedComment = await philosophercommentService.setComment({
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

// 니체 게시판 댓글 삭제
philosophercommentRouter.delete('/nietzschecomments/:id', verifyToken, async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await philosophercommentService.deleteComment({
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


// 칸트 게시판 댓글 작성
philosophercommentRouter.post("/kantcomments", verifyToken, async function(req, res, next){
    try {
        const userId = req.user;
        const postId = req.query.postId;
        const { content } = req.body;

        const newComment = await philosophercommentService.addComment({
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

// 칸트 게시판 게시글 1개 댓글 조회
philosophercommentRouter.get('/kantcommentlist', verifyToken, async (req, res, next) => {
    try {
        const postId = req.query.postId;
        const comments = await philosophercommentService.getComments({ postId });

        res.status(200).send(comments);
    } catch (error) {
        next(error);
    }
});

//칸트 게시판 댓글 수정
philosophercommentRouter.put('/kantcomments/:id', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const commentId = req.params.id;
        const content = req.body.content ?? null;

        const toUpdate = { content };
        const updatedComment = await philosophercommentService.setComment({
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

// 칸트 게시판 댓글 삭제
philosophercommentRouter.delete('/kantcomments/:id', verifyToken, async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await philosophercommentService.deleteComment({
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


// 아리스토텔레스 게시판 댓글 작성
philosophercommentRouter.post("/aristotlecomments", verifyToken, async function(req, res, next){
    try {
        const userId = req.user;
        const postId = req.query.postId;
        const { content } = req.body;

        const newComment = await philosophercommentService.addComment({
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

// 아리스토텔레스 게시판 게시글 1개 댓글 조회
philosophercommentRouter.get('/aristotlecommentlist', verifyToken, async (req, res, next) => {
    try {
        const postId = req.query.postId;
        const comments = await philosophercommentService.getComments({ postId });

        res.status(200).send(comments);
    } catch (error) {
        next(error);
    }
});

// 아리스토텔레스 게시판 댓글 수정
philosophercommentRouter.put('/aristotlecomments/:id', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const commentId = req.params.id;
        const content = req.body.content ?? null;

        const toUpdate = { content };
        const updatedComment = await philosophercommentService.setComment({
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

// 아리스토텔레스 게시판 댓글 삭제
philosophercommentRouter.delete('/aristotlecomments/:id', verifyToken, async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const deletedComment = await philosophercommentService.deleteComment({
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


export { philosophercommentRouter };

