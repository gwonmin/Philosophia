import { Philosopher, User } from "../db";

class philosopherService{
    //게시글 작성
    static async addPost({ philosopherName, userId, title, content }){
        const author = await User.findById({ userId });
        const newPost = { philosopherName, author, title, content };
        const creatednewPost = await Philosopher.create({ newPost });
        creatednewPost.errorMessage = null;

        return creatednewPost;
    }

    //게시글 상세 조회
    static async getPostInfo({ postId }){
        const post = await Philosopher.findByPostId({ postId });

        if (!post) {
            const errorMessage = "해당 포스트가 없습니다.";
            return { errorMessage };
        }
        return post
    }

    //게시글 전체 조회
    static async getPostList({ philosopherName }){
        const posts = await Philosopher.findAll({ philosopherName });
        return posts;
    }

    //게시글 수정
    static async setPost({ userId, postId, toUpdate }){
        let post = await Philosopher.findByPostId({ postId });

        if (!post) {
            const errorMessage = "해당 포스트가 없습니다.";
            return { errorMessage }
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

        const newValues = {
            title: toUpdate.title,
            content: toUpdate.content,
        };
        post = await Philosopher.update({ postId, newValues });
        return post;
    }

    //게시글 삭제
    static async deletePost({ userId, postId }){
        const post = await Philosopher.findByPostId({ postId });
        
        if (!post) {
            const errorMessage = '해당 포스트가 없습니다.';
            return { errorMessage };
        }

        if (post.author.id !== userId) {
            const errorMessage = '자신이 작성한 게시글만 삭제할 수 있습니다.';
            return { errorMessage };
        }
        const res = await Philosopher.delete({ postId });
        return { status: "success" };
    }

}

export { philosopherService };