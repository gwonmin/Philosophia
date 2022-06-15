import { Devate, User } from '../db';

class devateService {
    // 게시글 작성
    static async addPost({ userId, title, content, tag }) {
        const author = await User.findById({ userId });
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
        let post = await Devate.findByPostId({ postId });

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
            console.log(newFilter.tag)
            var last = newFilter.tag[newFilter.tag.length-1].replace('/', '');
            newFilter.tag.pop();
            console.log(newFilter.tag)
            newFilter.tag.push(last);
            console.log(newFilter.tag)
        }
        else {
            const posts = await Devate.findAllNoTag(newFilter);
            return posts;
        }

        const posts = await Devate.findAll(newFilter);
        return posts;
    }

    // 찬성
    static async setPostYes({ userId, postId }) {
        const post = await Devate.findByPostId({ postId });

        if (!post) {
            const errorMessage = '해당 포스트가 없습니다.';
            return { errorMessage };
        }

        const yes = await Devate.findYes({ postId, userId });
        let status, result;

        if (yes.length != 0) {
            status = '$pull';
            result = -1;
        } else {
            status = '$push';
            result = 1;
        }

        const newValues = {
            [status]: {
                yes: userId,
            },
            $inc: { yesCount: result }
        };

        const res = await Devate.updateYes({ userId, postId, newValues });
        console.log(res)
        return res;
        
    }

    // 반대
    static async setPostNo({ userId, postId }) {
        const post = await Devate.findByPostId({ postId });

        if (!post) {
            const errorMessage = '해당 포스트가 없습니다.';
            return { errorMessage };
        }

        const no = await Devate.findNo({ postId, userId });
        let status, result;

        if (no.length != 0) {
            status = '$pull';
            result = -1;
        } else {
            status = '$push';
            result = 1;
        }

        const newValues = {
            [status]: {
                no: userId,
            },
            $inc: { noCount: result }
        }

        const res = await Devate.updateNo({ postId, newValues });
        console.log(res)
        return res;

}
}

export { devateService };