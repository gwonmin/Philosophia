import { DevateModel } from "../schemas/devate";
import { DevateCommentModel } from "../schemas/devatecomment";
import { userModel } from "../schemas/user";


class Devate {
    static async create({ newPost }) {
        const createdNewPost = await DevateModel.create(newPost);
        return createdNewPost;
    }
    
    static async findByPostId({ postId }) {
        const post = await DevateModel.findOne({ _id: postId }).populate('author', 'id name');
        const comment = await DevateCommentModel.find({ postId: postId }).populate('author', 'id name');
        post.comment = comment;

        return post;
    }

    static async findAll(newFilter, page, limit) {
        const posts = await DevateModel.find(newFilter)
        .find({ tag: { $in: newFilter.tag } })
        .populate('author', 'id name')
        .sort('-createdAt')
        .skip((page-1)*limit)   
        .limit(limit) 
        .exec();
    
        return posts;
    }

    static async findAllNoTag(newFilter, page, limit) {
        const posts = await DevateModel.find(newFilter)
        .populate('author', 'id email name')
        .sort('-createdAt')
        .skip((page-1)*limit)   
        .limit(limit) 
        .exec();

        return posts;
    }

    static async update({ postId, newValues }) {
        const filter = { _id: postId };
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        const updatedPost = await DevateModel.findOneAndUpdate(filter, update, option);
        return updatedPost;
      }

    static async delete({ postId }) {
        await DevateModel.deleteOne({ _id: postId });
        return '삭제가 완료되었습니다.';
    }

    static async findYes({ postId, userId }) {
        const post = await DevateModel.findOne({ _id: postId }, 
        { yes: { $elemMatch: { $eq: userId } }});
        return post.yes;
    }

    static async findNo({ postId, userId }) {
        const post = await DevateModel.findOne({ _id: postId },
        { no: { $elemMatch: { $eq: userId } }});
        return post.no;
    }

    static async updateStance({ userId, postId, newValues }) {
        const filter = { _id: postId };
        const update = newValues;
        const option = { returnOriginal: false };
        const updatedPost = await DevateModel.findOneAndUpdate(filter, update, option);
        return updatedPost
    }

    static async updateNo({ userId, postId, newValues }) {
        // if ({ yes: { $in: userId } }){
        //     const errorMessage = '이미 찬성을 선택하였습니다.';
        //     return { errorMessage };
        // }

        const filter = { _id: postId };
        const update = newValues;
        const option = { returnOriginal: false };
        const updatedPost = await DevateModel.findOneAndUpdate(filter, update, option);
        return updatedPost
    }

    static async getTop3(){
        const posts = await DevateModel.aggregate([
            {$project:{
                countOfAll:{ '$add': [ { '$size': '$yes' }, { '$size': '$no' } ] }
             }},
            {$sort:{countOfAll:-1}},
            {$limit:3}
        ]);

        var postObj = []
        for(var i in posts){
            const postId = posts[i]._id;
            const post = await DevateModel.findOne({ _id: postId }).populate("author", "id name");
            postObj.push(post)
        }

        return postObj;
    }
}

export { Devate };