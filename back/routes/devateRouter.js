var express = require('express');

const devateRouter = express.Router();

// 게시글 작성
devateRouter.post('/devates', async (req, res, next) => {
    try {
        const userId = req.currentUserId;

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
devateRouter.get('/devates/:id', async (req, res, next) => {
    try {
        const postId = req.params.id;
        const currentPostInfo = await devateService.getPostInfo({ postId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);
    } catch (error) {
        next(error);
    }

});

// 게시글 수정
devateRouter.put('/devates/:id', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
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
devateRouter.delete('/devates/:id', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const postId = req.params.id;
        const deletedPost = await devateService.deletePost({ userId, postId });

        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(200).send("삭제가 완료되었습니다.")
    } catch (error) {
        next(error);
    }
});

// 전체 게시글 조회
devateRouter.get('/devates', async (req, res, next) => {
    try {

        const tag = req.query.tag ?? null;
        const filter = { tag };
        const posts = await devateService.getPosts(filter);

        res.status(200).send(posts);
    } catch (error) {
        next(error);
    }

});

// 찬성
devateRouter.put('/devates/:id/yes', async (req, res, next) => {
    try { 
        const userId = req.currentUserId;
        const postId = req.params.id;

        const yes = await devateService.setPostYes({ userId, postId });

        res.status(200).send(yes);
    } catch (error) {
        next(error);
    }
})

// 반대
devateRouter.put('/devates/:id/no', async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const postId = req.params.id;

        const no = await devateService.setPostNo({ userId, postId });

        res.status(200).send(no);
    } catch (error) {
        next(error);
    }
})
