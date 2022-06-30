import { Router } from 'express';
import { freetopicService } from '../services/freetopicService';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyRefresh } from '../middlewares/verifyRefresh';
import { FreeTopic } from '../db';
import { FreeTopicModel } from '../db/schemas/freetopic';

const freetopicRouter = Router();

// 게시글 작성
freetopicRouter.post('/freetopics', verifyToken, async (req, res, next) => {
  try {
    const userId = req.user;

    const { title, content } = req.body;

    if (!title || !content) {
      throw new Error('제목과 내용을 입력해 주세요');
    }

    const newPost = await freetopicService.addPost({
      userId,
      title,
      content,
    });

    if (newPost.errorMessage) {
      throw new Error(newPost.errorMessage);
    }

    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});

// 게시글 1개 조회
freetopicRouter.get('/freetopics/:id', async (req, res, next) => {
  try {
    const postId = req.params.id;
    const currentPostInfo = await freetopicService.getPostInfo({ postId });
    const article = await FreeTopic.findByPostId({ postId });

    article.visited++;
    await article.save();

    if (currentPostInfo.errorMessage) {
      throw new Error(currentPostInfo.errorMessage);
    }
    res.status(200).send(currentPostInfo);
  } catch (error) {
    next(error);
  }
});

// 게시글 수정
freetopicRouter.put('/freetopics/:id', verifyToken, async (req, res, next) => {
  try {
    const userId = req.user;
    const postId = req.params.id;
    const title = req.body.title ?? null;
    const content = req.body.content ?? null;

    const toUpdate = { title, content };

    const updatedPost = await freetopicService.setPost({ userId, postId, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// 게시글 삭제
freetopicRouter.delete('/freetopics/:id', verifyToken, async (req, res, next) => {
  try {
    const userId = req.user;
    const postId = req.params.id;
    const deletedPost = await freetopicService.deletePost({ userId, postId });

    if (deletedPost.errorMessage) {
      throw new Error(deletedPost.errorMessage);
    }

    res.status(200).send(deletedPost);
  } catch (error) {
    next(error);
  }
});

// 자유 토론 게시판 전체 게시글 조회(페이지네이션)
freetopicRouter.get('/freetopics', async function(req, res, next){ 
  let page = Math.max(1, parseInt(req.query.page));   
  let limit = 15 //Math.max(1, parseInt(req.query.limit));
  page = !isNaN(page)?page:1;                         
  limit = !isNaN(limit)?limit:5;                     

  let skip = (page-1)*limit;
  let count = await FreeTopicModel.countDocuments({});
  let maxPage = Math.ceil(count/limit);
  let posts = await FreeTopicModel.find({}).populate('author', 'id name')
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
});

/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
freetopicRouter.get('/refresh', verifyRefresh);

export { freetopicRouter };
