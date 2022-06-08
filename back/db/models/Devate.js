const { DevateModel } = require('../schemas/devate');
// const { UserModel } = require('../schemas/user');

class Devate {
    static async create({ newPost }) {
        const createdNewPost = await DevateModel.create(newPost);
        return createdNewPost;
    }
    
    static async findByPostId({ postId }) {
        const post = await DevateModel.findOne({ _id: postId }).populate('author', 'id email name');
        return post;
    }

    static async findAll(newFilter) {
        const posts = await DevateModel.find(newFilter)
        .find({ tag: { $in: newFilter.tag } })
        .populate('author', 'id name')

        return posts;
    }

    static async findAllNoTag(newFilter) {
        const posts = await DevateModel.find(newFilter)
        .populate('author', 'id name')

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
}

module.exports = { Devate };