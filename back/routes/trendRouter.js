import { Router } from "express";
import { trendService } from "../services/trendService";

const trendRouter = Router();

trendRouter.get("/trend", async function(req, res, next){
    try{
        const freePosts = await trendService.getTop3Free();
        const devatePosts = await trendService.getTop3Devate();
        const sharePosts = await trendService.getTop3Share();
        res.status(200).send({freePosts, devatePosts, sharePosts});
    } catch(error){
        next(error);
    };
});

export { trendRouter };