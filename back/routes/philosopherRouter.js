import { Router } from "express";
import { philosopherService } from "../services/philosopherService";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";
import { PhilosopherModel } from "../db/schemas/philosopher";

const philosopherRouter = Router();

//니체 게시판 게시글 작성
philosopherRouter.post("/nietzsche", verifyToken, async function(req, res, next){
    try{
        const userId = req.user;
        const { title, content } = req.body;
        const philosopherName = '니체';

        if (!title || !content){
            throw new Error("제목과 내용을 입력해주세요.");
        };

        const newPost = await philosopherService.addPost({
            philosopherName,
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
        const currentPostInfo = await philosopherService.getPostInfo({ postId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);

    } catch (error){
        next(error);
    };
});

// 철학자별 게시판(니체) 전체 게시글 조회(페이지네이션)
philosopherRouter.get('/nietzsche', async function(req, res, next){
    try{
        let page = Math.max(1, parseInt(req.query.page));   
        let limit = 15 //Math.max(1, parseInt(req.query.limit));
        page = !isNaN(page)?page:1;                         
        limit = !isNaN(limit)?limit:5;                     
        
        const philosopherName = '니체';
        let skip = (page-1)*limit;
        let count = await PhilosopherModel.countDocuments({});
        let maxPage = Math.ceil(count/limit);
        let posts = await PhilosopherModel.find({ philosopherName }).populate('author', 'id name')
        .sort('-createdAt')
        .skip(skip)   
        .limit(limit) 
        .exec();
        let result = {
            posts:posts,
            currentPage:page,
            maxPage:maxPage,
            limit:limit
        }
        res.status(200).send(result)
    } catch(error){
        next(error);
    }
  });


// 니체 게시판 게시글 수정
philosopherRouter.put("/nietzsche/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const title = req.body.title ?? null;
        const content = req.body.content ?? null;

        const toUpdate = { title, content };

        const updatedPost = await philosopherService.setPost({ 
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

        const deletedPost = await philosopherService.deletePost({ userId, postId });
        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(200).send(deletedPost)
    } catch (error){
        next(error);
    };
});


// 칸트 게시판 게시글 작성
philosopherRouter.post("/kant", verifyToken, async function(req, res, next){
    try{
        const userId = req.user;
        const philosopherName = '칸트';
        const { title, content } = req.body;

        if (!title || !content){
            throw new Error("제목과 내용을 입력해주세요.");
        };

        const newPost = await philosopherService.addPost({
            philosopherName,
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

// 칸트 게시판 게시글 상세 조회
philosopherRouter.get("/kant/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const currentPostInfo = await philosopherService.getPostInfo({ postId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);

    } catch (error){
        next(error);
    };
});

// 철학자별 게시판(칸트) 전체 게시글 조회(페이지네이션)
philosopherRouter.get('/kant', async function(req, res, next){
    try{
        let page = Math.max(1, parseInt(req.query.page));   
        let limit = 15 //Math.max(1, parseInt(req.query.limit));
        page = !isNaN(page)?page:1;                         
        limit = !isNaN(limit)?limit:5;                     
        
        const philosopherName = '칸트';
        let skip = (page-1)*limit;
        let count = await PhilosopherModel.countDocuments({});
        let maxPage = Math.ceil(count/limit);
        let posts = await PhilosopherModel.find({ philosopherName }).populate('author', 'id name')
        .sort('-createdAt')
        .skip(skip)   
        .limit(limit) 
        .exec();
        let result = {
            posts:posts,
            currentPage:page,
            maxPage:maxPage,
            limit:limit
        }
        res.status(200).send(result)
    } catch(error){
        next(error);
    }
  });


// 칸트 게시판 게시글 수정
philosopherRouter.put("/kant/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const title = req.body.title ?? null;
        const content = req.body.content ?? null;

        const toUpdate = { title, content };

        const updatedPost = await philosopherService.setPost({ 
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

// 칸트 게시판 게시글 삭제
philosopherRouter.delete("/kant/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const deletedPost = await philosopherService.deletePost({ userId, postId });
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
        const philosopherName = '아리스토텔레스';
        const { title, content } = req.body;

        if (!title || !content){
            throw new Error("제목과 내용을 입력해주세요.");
        };

        const newPost = await philosopherService.addPost({
            philosopherName,
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
        const currentPostInfo = await philosopherService.getPostInfo({ postId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);

    } catch (error){
        next(error);
    };
});

// 철학자별 게시판(아리스토텔레스) 전체 게시글 조회(페이지네이션)
philosopherRouter.get('/aristotle', async function(req, res, next){
    try{
        let page = Math.max(1, parseInt(req.query.page));   
        let limit = 15 //Math.max(1, parseInt(req.query.limit));
        page = !isNaN(page)?page:1;                         
        limit = !isNaN(limit)?limit:5;                     
        
        const philosopherName = '아리스토텔레스';
        let skip = (page-1)*limit;
        let count = await PhilosopherModel.countDocuments({});
        let maxPage = Math.ceil(count/limit);
        let posts = await PhilosopherModel.find({ philosopherName }).populate('author', 'id name')
        .sort('-createdAt')
        .skip(skip)   
        .limit(limit) 
        .exec();
        let result = {
            posts:posts,
            currentPage:page,
            maxPage:maxPage,
            limit:limit
        }
        res.status(200).send(result)
    } catch(error){
        next(error);
    }
  });


// 아리스토텔레스 게시판 게시글 수정
philosopherRouter.put("/aristotle/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const title = req.body.title ?? null;
        const content = req.body.content ?? null;

        const toUpdate = { title, content };

        const updatedPost = await philosopherService.setPost({ 
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

// 아리스토텔레스 게시판 게시글 삭제
philosopherRouter.delete("/aristotle/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const deletedPost = await philosopherService.deletePost({ userId, postId });
        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(200).send(deletedPost)
    } catch (error){
        next(error);
    };
});

export { philosopherRouter };