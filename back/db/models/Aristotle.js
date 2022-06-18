import { AristotleModel } from "../schemas/aristotle";

class Aristotle{
    //입력받은 정보로 게시글 생성
    static async create({ newPost }){
        const creatednewPost = await AristotleModel.create(newPost);
        return creatednewPost;
    }

    //게시글의 고유 id로 게시글 검색
    static async findByPostId({ postId }){
        const post = await AristotleModel.findOne({ _id: postId }).populate("author", "id email name");
        return post;
    }

    static async findAll(){
        const posts = await AristotleModel.find({});
        return posts;
    }

    //게시글 수정
    static async update({ postId, newValues }) {
        const filter = { _id: postId };
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        const updatedPost = await AristotleModel.findOneAndUpdate(filter, update, option);
        return updatedPost;
    }

    //게시글 삭제
    static async delete({ postId }) {
        const deletedPost = await AristotleModel.deleteOne({ _id: postId });
        return deletedPost;
    }
};

export { Aristotle };