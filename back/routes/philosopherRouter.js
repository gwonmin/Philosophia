import { Router } from "express";
import { nietzscheService } from "../services/nietzscheService";
import { descartesService } from "../services/descartesService";
import { aristotleService } from "../services/aristotleService";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

const philosopherRouter = Router();

//니체 게시판 게시글 작성
philosopherRouter.post("/nietzsche", verifyToken, async function(req, res, next){
    try{
        const userId = req.user;
        const { title, content } = req.body;

        if (!title || !content){
            throw new Error("제목과 내용을 입력해주세요.");
        };

        const newPost = await nietzscheService.addPost({
            userId,
            title,
            content,
        });

        if (newPost.errorMessage) {
            throw new Error(newPost.errorMessage);
          };
          res.status(201).json(newPost);        
        } catch (error) {
            next(error)
        };
});

// 니체 게시판 게시글 상세 조회
philosopherRouter.get("/nietzsche/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const currentPostInfo = await nietzscheService.getPostInfo({ postId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);

    } catch (error){
        next(error);
    };
});

// 니체 게시판 게시글 전체 조회
philosopherRouter.get("/nietzsche", verifyToken, async function(req, res, next){
    try{
        const posts = await nietzscheService.getPostList();
        res.status(200).send(posts);
    } catch (error){
        next(error);
    };
});

// 니체 게시판 게시글 수정
philosopherRouter.put("/nietzsche/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const title = req.body.title ?? null;
        const content = req.body.content ?? null;

        const toUpdate = { title, content };

        const updatedPost = await nietzscheService.setPost({ 
            userId, 
            postId, 
            toUpdate 
        });

        if (updatedPost.errorMessage) {
            throw new Error(updatedPost.errorMessage);
        }
        res.status(200).json(updatedPost);
    } catch (error){
        next(error);
    };
});

// 니체 게시판 게시글 삭제
philosopherRouter.delete("/nietzsche/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const deletedPost = await nietzscheService.deletePost({ userId, postId });
        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(200).send(deletedPost)
    } catch (error){
        next(error);
    };
});


// 데카르트 게시판 게시글 작성
philosopherRouter.post("/descartes", verifyToken, async function(req, res, next){
    try{
        const userId = req.user;
        const { title, content } = req.body;

        if (!title || !content){
            throw new Error("제목과 내용을 입력해주세요.");
        };

        const newPost = await descartesService.addPost({
            userId,
            title,
            content,
        });

        if (newPost.errorMessage) {
            throw new Error(newPost.errorMessage);
          };
          res.status(201).json(newPost);        
        } catch (error) {
            next(error)
        };
});

// 데카르트 게시판 게시글 상세 조회
philosopherRouter.get("/descartes/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const currentPostInfo = await descartesService.getPostInfo({ postId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);

    } catch (error){
        next(error);
    };
});

// 데카르트 게시판 게시글 전체 조회
philosopherRouter.get("/descartes", verifyToken, async function(req, res, next){
    try{
        const posts = await descartesService.getPostList();
        res.status(200).send(posts);
    } catch (error){
        next(error);
    };
});

// 데카르트 게시판 게시글 수정
philosopherRouter.put("/descartes/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const uesrId = req.user;

        const title = req.body.title ?? null;
        const content = req.body.content ?? null;

        const toUpdate = { title, content };

        const updatedPost = await descartesService.setPost({ uesrId, postId, toUpdate });

        if (updatedPost.errorMessage) {
            throw new Error(updatedPost.errorMessage);
        }
        res.status(200).json(updatedPost);
    } catch (error){
        next(error);
    };
});

// 데카르트 게시판 게시글 삭제
philosopherRouter.delete("/descartes/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const deletedPost = await descartesService.deletePost({ userId, postId });
        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(200).send(deletedPost)
    } catch (error){
        next(error);
    };
});


// 아리스토텔레스 게시판 게시글 작성
philosopherRouter.post("/aristotle", verifyToken, async function(req, res, next){
    try{
        const userId = req.user;
        const { title, content } = req.body;

        if (!title || !content){
            throw new Error("제목과 내용을 입력해주세요.");
        };

        const newPost = await aristotleService.addPost({
            userId,
            title,
            content,
        });

        if (newPost.errorMessage) {
            throw new Error(newPost.errorMessage);
          };
          res.status(201).json(newPost);        
        } catch (error) {
            next(error)
        };
});

// 아리스토텔레스 게시판 게시글 상세 조회
philosopherRouter.get("/aristotle/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const currentPostInfo = await aristotleService.getPostInfo({ postId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);

    } catch (error){
        next(error);
    };
});

// 아리스토텔레스 게시판 게시글 전체 조회
philosopherRouter.get("/aristotle", verifyToken, async function(req, res, next){
    try{
        const posts = await aristotleService.getPostList();
        res.status(200).send(posts);
    } catch (error){
        next(error);
    };
});

// 아리스토텔레스 게시판 게시글 수정
philosopherRouter.put("/aristotle/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const title = req.body.title ?? null;
        const content = req.body.content ?? null;

        const toUpdate = { title, content };

        const updatedPost = await aristotleService.setPost({ userId, postId, toUpdate });

        if (updatedPost.errorMessage) {
            throw new Error(updatedPost.errorMessage);
        }
        res.status(200).json(updatedPost);
    } catch (error){
        next(error);
    };
});

// 아리스토텔레스 게시판 게시글 삭제
philosopherRouter.delete("/aristotle/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const deletedPost = await aristotleService.deletePost({ userId, postId });
        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(200).send(deletedPost)
    } catch (error){
        next(error);
    };
});

export { philosopherRouter };