import { Router } from "express";
import { trendService } from "../services/trendService";

const trendRouter = Router();

trendRouter.get("/trend", async function(req, res, next){
    try{
        const freePosts = await trendService.getTop3Free();
        const devatePosts = await trendService.getTop3Devate();
        res.status(200).send({freePosts, devatePosts});
    } catch(error){
        next(error);
    };
});

export { trendRouter };