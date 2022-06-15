import { Router } from "express";
import { shareService } from "../services/shareService" 
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRefresh } from "../middlewares/verifyRefresh";

const shareRouter = Router();

// 공유 글 작성
shareRouter.post('/shares', verifyToken, async function (req, res, next) {
    const userId = req.user;

    const { title } = req.body;
    const content = 

})

// 글 1개 조회

// 글 삭제

// 전체 공유글 조회

/* access token을 재발급 하기 위한 router.
  access token과 refresh token을 둘 다 헤더에 담아서 요청해야함 */
devateRouter.get("/refresh", verifyRefresh);

export { devateRouter };