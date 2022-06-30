import { Router } from "express";
import { dataService } from "../services/dataService";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

const dataRouter = Router();
const upload = require("../modules/multer");


dataRouter.post("/data", verifyToken, async function(req, res, next){
    try{
        const userId = req.user;
        const { title, content, filePath } = req.body;

        if (!title || !content){
            throw new Error("제목과 내용을 입력해주세요.");
        };

        const newPost = await dataService.addPost({
            userId,
            title,
            content,
            filePath,
        });

        if (newPost.errorMessage) {
            throw new Error(newPost.errorMessage);
          };
          res.status(201).json(newPost);        
        } catch (error) {
            next(error)
        };
});

dataRouter.post("/data/uploadfile", verifyToken, 
  upload.single('file'), async function(req, res, next){
  try{
    const fileData = req.file;

    if (fileData === undefined){
      return res.status(202).json({
        error: false,
      });
    } else{
      res.status(200).send(fileData.location);
    }
  } catch (error) {
    next(error);
  }
});

dataRouter.get("/data/:id", async function(req, res, next){
    try{
        const postId = req.params.id;
        const currentPostInfo = await dataService.getPostInfo({ postId });

        if (currentPostInfo.errorMessage) {
            throw new Error(currentPostInfo.errorMessage);
        }
        res.status(200).send(currentPostInfo);

    } catch (error){
        next(error);
    };
});

dataRouter.get("/data", async function(req, res, next){
    try{
        const posts = await dataService.getPostList();
        res.status(200).send(posts);
    } catch (error){
        next(error);
    };
});

dataRouter.put("/data/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const title = req.body.title ?? null;
        const content = req.body.content ?? null;

        const toUpdate = { title, content };

        const updatedPost = await dataService.setPost({ 
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

dataRouter.delete("/data/:id", verifyToken, async function(req, res, next){
    try{
        const postId = req.params.id;
        const userId = req.user;

        const deletedPost = await dataService.deletePost({ userId, postId });
        if (deletedPost.errorMessage) {
            throw new Error(deletedPost.errorMessage);
        }

        res.status(200).send(deletedPost)
    } catch (error){
        next(error);
    };
});

export { dataRouter };