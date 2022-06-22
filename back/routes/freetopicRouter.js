import { Router } from 'express';
import { freetopicService } from '../services/freetopicService';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyRefresh } from '../middlewares/verifyRefresh';

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
freetopicRouter.get('/freetopics/:id', verifyToken, async (req, res, next) => {
  try {
    const postId = req.params.id;
    const currentPostInfo = await freetopicService.getPostInfo({ postId });

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

// 전체 게시글 조회
freetopicRouter.get('/freetopics', verifyToken, async (req, res, next) => {
  try {
    const posts = await freetopicService.getPosts();

    res.status(200).send(posts);
  } catch (error) {
    next(error);
  }
});

/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
freetopicRouter.get('/refresh', verifyRefresh);

export { freetopicRouter };