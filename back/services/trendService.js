import { FreeTopic, Devate, User } from '../db';

class trendService{
    static async getTop3Free(){
        const posts = await FreeTopic.getTop3();
        return posts;
    }

    static async getTop3Devate(){
        const posts = await Devate.getTop3();
        return posts;
    }

    static async getTop3Share(){
        const posts = await Share.getTop3();
        return posts;
    }

};

export { trendService }