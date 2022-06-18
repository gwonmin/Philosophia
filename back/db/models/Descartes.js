import { DescartesModel } from "../schemas/descartes";
import { DescartesCommentModel } from "../schemas/descartescomment"

class Descartes{
    //입력받은 정보로 게시글 생성
    static async create({ newPost }){
        const creatednewPost = await DescartesModel.create(newPost);
        return creatednewPost;
    }

    //게시글의 고유 id로 게시글 검색
    static async findByPostId({ postId }){
        const post = await DescartesModel.findOne({ _id: postId }).populate("author", "id email name");
        const comment = await DescartesCommentModel.find({ postId: postId }).populate('author', 'id name');
        post.comment = comment;

        return post;
    }

    static async findAll(){
        const posts = await DescartesModel.find({}).populate('author', 'id name');
        return posts;
    }

    //게시글 수정
    static async update({ postId, newValues }) {
        const filter = { _id: postId };
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        const updatedPost = await DescartesModel.findOneAndUpdate(filter, update, option);
        return updatedPost;
    }

    //게시글 삭제
    static async delete({ postId }) {
        const deletedPost = await DescartesModel.deleteOne({ _id: postId });
        return deletedPost;
    }
};

export { Descartes };