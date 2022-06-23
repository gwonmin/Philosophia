import { Router } from "express";
import { trendService } from "../services/trendService";

const trendRouter = Router();

trendRouter.get("/trend", async function(req, res, next){
    try{
        const posts = await trendService.getTop3();
        res.status(200).send(posts);
    } catch(error){
        next(error);
    };
});

export { trendRouter };