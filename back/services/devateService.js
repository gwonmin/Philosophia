// const { Devate, User } = require('../db');

class devateService {
    // 게시글 작성
    static async addPost({ userId, title, content, tag }) {
        const author = await User.findByUserId({ userId });
        const newPost = { author, title, content, tag };
        const createdNewPost = await Devate.create({ newPost });
        createdNewPost.errorMessage = null;

        return createdNewPost;
    }

    // 게시글 1개 조회
    static async getPostInfo({ postId }) {
        const post = await Devate.findByPostId({ postId });

        if (!post) {
            const errorMessage = '해당 포스트가 없습니다.';
            return { errorMessage };
        }

        return post;
    }

    // 게시글 수정
    static async setPost({ userId, postId, toUpdate }) {
        const post = await Devate.findByPostId({ postId });

        if (!post) {
            const errorMessage = '해당 포스트가 없습니다.';
            return { errorMessage };
        }
        if (post.author.id !== userId) {
            const errorMessage = '자신이 작성한 게시글만 수정할 수 있습니다.';
            return { errorMessage };
        }
        if (!toUpdate.title) {
            toUpdate.title = post.title;
        }
        if (!toUpdate.content) {
            toUpdate.content = post.content;
        }
        if (!toUpdate.tag) {
            toUpdate.tag = post.tag;
        }

        const newValues = {
            title: toUpdate.title,
            content: toUpdate.content,
            tag: toUpdate.tag,
        };

        post = await Devate.update({ postId, newValues });
        return post
    }

    // 게시글 삭제
    static async deletePost({ userId, postId }) {
        const post = await Devate.findByPostId({ postId });

        if (!post) {
            const errorMessage = '해당 포스트가 없습니다.';
            return { errorMessage };
        }
        if (post.author.id !== userId) {
            const errorMessage = '자신이 작성한 게시글만 삭제할 수 있습니다.';
            return { errorMessage };
        }   

        const res = await Devate.delete({ postId });
        return res;
    }

    // 전체 게시글 조회
    static async getPosts(filter) {
        let newFilter = {};

        if (filter.tag) {
            newFilter.tag = filter.tag.split(',');
            var last = newFilter.tag[newFilter.tag.length-1].replace('/', '');
            newFilter.tag.pop();
            newFilter.tag.push(last);
        }
        else {
            const posts = await Devate.findAllNoTag(newFilter);
            return posts;
        }

        const posts = await Devate.findAll(newFilter);
        return posts;
    }

    // 찬성

    // 반대
}

module.exports ={ devateService };