import { Router } from 'express';
import { shareService } from '../services/shareService';
import { verifyToken } from '../middlewares/verifyToken';
import { verifyRefresh } from '../middlewares/verifyRefresh';

const shareRouter = Router();

// 공유 글 작성
shareRouter.post('/shares', verifyToken, async function (req, res, next) {
  try {
    const userId = req.user;
    const { philosopher, subject, content } = req.body;

    const newShare = await shareService.addShare({
      userId,
      philosopher,
      subject,
      content,
    });

    if (newShare.errorMessage) {
      throw new Error(newShare.errorMessage);
    }

    res.status(201).json(newShare);
  } catch (error) {
    next(error);
  }
});

// 글 수정
shareRouter.put('/shares/:id', verifyToken, async (req, res, next) => {
  try {
    const userId = req.user;
    const shareId = req.params.id;
    const philosopher = req.body.title ?? null;
    const subject = req.body.subject ?? null;
    const content = req.body.content ?? null;

    const toUpdate = { philosopher, subject, content };

    const updatedPost = await shareService.setPost({ userId, shareId, toUpdate });

    if (updatedPost.errorMessage) {
      throw new Error(updatedPost.errorMessage);
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
});

// 글 1개 조회
shareRouter.get('/shares/:id', verifyToken, async function (req, res, next) {
  try {
    const userId = req.user;
    const shareId = req.params.id;
    const currentShareInfo = await shareService.getShareInfo({ shareId, userId });

    if (currentShareInfo.errorMessage) {
      throw new Error(currentShareInfo.errorMessage);
    }

    res.status(200).send(currentShareInfo);
  } catch (error) {
    next(error);
  }
});

// 글 삭제
shareRouter.delete('/shares/:id', verifyToken, async function (req, res, next) {
  try {
    const userId = req.user;
    const shareId = req.params.id;
    const deletedShare = await shareService.deleteShare({ userId, shareId });

    if (deletedShare.errorMessage) {
      throw new Error(deletedShare.errorMessage);
    }

    res.status(200).send(deletedShare);
  } catch (error) {
    next(error);
  }
});

// 전체 공유글 조회
shareRouter.get('/shares', verifyToken, async function (req, res, next) {
    let skip = (page-1)*limit;
    let count = await ShareModel.countDocuments({});
    let maxPage = Math.ceil(count/limit);
    let posts = await ShareModel.find({}).populate('author', 'id name')
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

// 좋아요
shareRouter.put('/shares/:id/like', verifyToken, async function (req, res, next) {
  try {
    const userId = req.user;
    const shareId = req.params.id;

    const like = await shareService.setShareLike({ userId, shareId });

    res.status(200).send(like);
  } catch (error) {
    next(error);
  }
});

/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
shareRouter.get('/refresh', verifyRefresh);

export { shareRouter };
