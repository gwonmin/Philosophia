import { Router } from "express";
import { shareService } from "../services/shareService" 
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

const shareRouter = Router();

// 공유 글 작성
shareRouter.post('/shares', verifyToken, async function (req, res, next) {
  try {
    const userId = req.user;
    const { content } = req.body;

    const newShare = await shareService.addShare({
      userId,
      content
    });

    if (newShare.errorMessage) {
      throw new Error(newShare.errorMessage);
    }

    res.status(201).json(newShare);
   
  } catch (error) {
    next(error);
  }
});

// 글 1개 조회
shareRouter.get('/shares/:id', verifyToken, async function (req, res, next) {
  try{
    const shareId = req.params.id;
    const currentShareInfo = await shareService.getShareInfo({ shareId });

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
  try {
    const shares = await shareService.getShares();

    res.status(200).send(shares);
  } catch (error) {
    next(error);
  }
})

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
shareRouter.get("/refresh", verifyRefresh);

export { shareRouter };