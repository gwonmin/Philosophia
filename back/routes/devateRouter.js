import { Router } from "express";
import { devateService } from "../services/devateService" 
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

const devateRouter = Router();

// 게시글 작성
devateRouter.post('/devates', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;

        const { title, content, tag } = req.body;

        if (!title || !content) {
            throw new Error('제목과 내용을 입력해 주세요');
          }

        const newPost = await devateService.addPost({
            userId,
            title,
            content,
            tag
        });

        if (newPost.errorMessage) {
            throw new Error(newPost.errorMessage);
          }

        res.status(201).json(newPost);        
    } catch (error) {
        next(error)
    }
});

// 게시글 1개 조회
devateRouter.get('/devates/:id', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const postId = req.params.id;
        const currentPostInfo = await devateService.getPostInfo({ postId, userId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);
    } catch (error) {
        next(error);
    }

});

// 게시글 수정
devateRouter.put('/devates/:id', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const postId = req.params.id;
        const title = req.body.title ?? null;
        const content = req.body.content ?? null;
        const tag = req.body.tag ?? null;

        const toUpdate = { title, content, tag };

        const updatedPost = await devateService.setPost({ userId, postId, toUpdate });

        if (updatedPost.errorMessage) {
            throw new Error(updatedPost.errorMessage);
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
});

// 게시글 삭제
devateRouter.delete('/devates/:id', verifyToken, async (req, res, next) => {
    try {
        const userId = req.user;
        const postId = req.params.id;
        const deletedPost = await devateService.deletePost({ userId, postId });

        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(200).send(deletedPost)
    } catch (error) {
        next(error);
    }
});

// 전체 게시글 조회
devateRouter.get('/devates', verifyToken, async (req, res, next) => {
    try {

        const tag = req.query.tag ?? null;
        const filter = { tag };
        const posts = await devateService.getPosts(filter);

        res.status(200).send(posts);
    } catch (error) {
        next(error);
    }

});

// 찬성, 반대
devateRouter.put('/devates/:id/stance', verifyToken, async (req, res, next) => {
    try { 
        const userId = req.user;
        const postId = req.params.id;
        const { stance } = req.body;
    
        const support = await devateService.setPostStance({ userId, postId, stance });

        res.status(200).send(support);
    } catch (error) {
        next(error);
    }
})


/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
devateRouter.get("/refresh", verifyRefresh);

export { devateRouter };