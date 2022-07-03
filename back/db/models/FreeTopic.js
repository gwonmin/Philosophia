import { FreeTopicModel } from '../schemas/freetopic';
import { FreeTopicCommentModel } from '../schemas/freetopiccomment';
import { userModel } from '../schemas/user';

class FreeTopic {
  static async create({ newPost }) {
    const createdNewPost = await FreeTopicModel.create(newPost);
    return createdNewPost;
  }

  static async findByPostId({ postId }) {
    const post = await FreeTopicModel.findOne({ _id: postId }).populate('author', 'id name');
    const comment = await FreeTopicCommentModel.find({ postId: postId }).populate('author', 'id name');
    post.comment = comment;
    return post;
  }

  static async findAll() {
    const posts = await FreeTopicModel.find()
    .populate('author', 'id name')
    .sort({createdAt: -1 });
    return posts;
  }

  static async update({ postId, newValues }) {
    const filter = { _id: postId };
    const update = { $set: newValues };
    const option = { returnOriginal: false };
    const updatedPost = await FreeTopicModel.findOneAndUpdate(filter, update, option);
    return updatedPost;
  }

  static async delete({ postId }) {
    const deletedPost = await FreeTopicModel.deleteOne({ _id: postId });
    return deletedPost;
  }

  static async getTop3(){
    // calVisited: 해당 게시물의 조회수를 현재 시간에서 게시물이 생성된 시간을 뺀 값으로 나눈 결과
    // => 생성된지 오래된 게시물일수록 조회수에 대한 가중치가 낮아짐
    const posts = await FreeTopicModel.aggregate([
      {$project:{
        calVisited:{'$divide':['$visited', {'$subtract':[new Date(), '$createdAt']}]}
      }},
      {$sort:{calVisited:-1}},
      {$limit:3}
    ]);

    var postObj = []
        for(var i in posts){
            const postId = posts[i]._id;
            const post = await FreeTopicModel.findOne({ _id: postId }).populate("author", "id name");
            postObj.push(post)
        }

        return postObj;
  }
}

export { FreeTopic };
