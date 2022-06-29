import { DataModel } from "../schemas/data";
import { DataCommentModel } from "../schemas/datacomment";

class Data{
    //입력받은 정보로 게시글 생성
    static async create({ newPost }){
        const creatednewPost = await DataModel.create(newPost);
        return creatednewPost;
    }

    //게시글의 고유 id로 게시글 검색
    static async findByPostId({ postId }){
        const post = await DataModel.findOne({ _id: postId }).populate("author", "id email name");
        const comment = await DataCommentModel.find({ postId: postId }).populate('author', 'id name');
        post.comment = comment;

        return post;
    }

    // userId로 게시글 검색
    static async findByUserId({ userId }){
        const posts = await DataModel.find({ author: userId });
        return posts;
    }

    static async findAll(){
        const posts = await DataModel.find({});
        return posts;
    }

    //게시글 수정
    static async update({ postId, newValues }) {
        const filter = { _id: postId };
        const update = { $set: newValues };
        const option = { returnOriginal: false };
        const updatedPost = await DataModel.findOneAndUpdate(filter, update, option);
        return updatedPost;
    }

    //게시글 삭제
    static async delete({ postId }) {
        const deletedPost = await DataModel.deleteOne({ _id: postId });
        return deletedPost;
    }

    static async addFileById({ articleId, filePath }) {
        const filter = { id : articleId };
        const update = { filePath : filePath };
        const option = { new: true };
  
        const addFilePost = await DataModel.findOneAndUpdate(
          filter,
          update,
          option
        );
        return addFilePost;
      }
};

export { Data };