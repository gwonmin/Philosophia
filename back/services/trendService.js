import { FreeTopic, User } from '../db';

class trendService{
    static async getTop3(){
        const posts = await FreeTopic.getTop3();
        return posts;
    }
};

export { trendService }