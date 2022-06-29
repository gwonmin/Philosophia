import { PhilosopherModel } from "../schemas/philosopher";
import { PhilosopherCommentModel } from "../schemas/philosophercomment";

class Philosopher{
    //입력받은 정보로 게시글 생성
    static async create({ newPost }){
        const creatednewPost = await PhilosopherModel.create(newPost);
        return creatednewPost;
    }

    //게시글의 고유 id로 게시글 검색
    static async findByPostId({ postId }){
        const post = await PhilosopherModel.findOne({ _id: postId }).populate("author", "id name");
        const comment = await PhilosopherCommentModel.find({ postId: postId }).populate('author', 'id name');
        post.comment = comment;

        return post;
    }

    // userId로 게시글 검색
    static async findByUserId({ userId }){
        const posts = await PhilosopherModel.find({ author: userId });
        return posts;
    }

    // 철학자 게시판 별 전체 글 조회
    static async findAll({ philosopherName }){
        if(philosopherName === '니체'){
            const posts = await PhilosopherModel.find({philosopherName:'니체'}).populate('author', 'id name');
            return posts;
        } else if(philosopherName === '칸트'){
            const posts = await PhilosopherModel.find({philosopherName:'칸트'}).populate('author', 'id name');
            return posts;
        } else if(philosopherName === '아리스토텔레스'){
            const posts = await PhilosopherModel.find({philosopherName:'아리스토텔레스'}).populate('author', 'id name');
            return posts;
        };
    }

    //게시글 수정
    static async update({ postId, newValues }) {
        const filter = { _id: postId };
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        const updatedPost = await PhilosopherModel.findOneAndUpdate(filter, update, option);
        return updatedPost;
    }

    //게시글 삭제
    static async delete({ postId }) {
        const deletedPost = await PhilosopherModel.deleteOne({ _id: postId });
        return deletedPost;
    }
};

export { Philosopher };