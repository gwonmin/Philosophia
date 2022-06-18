import { NietzscheModel } from "../schemas/nietzsche";
import { NietzscheCommentModel } from "../schemas/nietzschecomment";

class Nietzsche{
    //입력받은 정보로 게시글 생성
    static async create({ newPost }){
        const creatednewPost = await NietzscheModel.create(newPost);
        return creatednewPost;
    }

    //게시글의 고유 id로 게시글 검색
    static async findByPostId({ postId }){
        const post = await NietzscheModel.findOne({ _id: postId }).populate("author", "id email name");
        const comment = await NietzscheCommentModel.find({ postId: postId }).populate('author', 'id name');
        post.comment = comment;

        return post;
    }

    static async findAll(){
        const posts = await NietzscheModel.find({}).populate('author', 'id name');
        return posts;
    }

    //게시글 수정
    static async update({ postId, newValues }) {
        const filter = { _id: postId };
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        const updatedPost = await NietzscheModel.findOneAndUpdate(filter, update, option);
        return updatedPost;
    }

    //게시글 삭제
    static async delete({ postId }) {
        const deletedPost = await NietzscheModel.deleteOne({ _id: postId });
        return deletedPost;
    }
};

export { Nietzsche };