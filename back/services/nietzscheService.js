import { Nietzsche, User } from "../db";

class nietzscheService{
    //게시글 작성
    static async addPost({ userId, title, content }){
        const author = await User.findById({ userId });
        const newPost = { author, title, content };
        const creatednewPost = await Nietzsche.create({ newPost });
        creatednewPost.errorMessage = null;

        return creatednewPost;
    }

    //게시글 상세 조회
    static async getPostInfo({ postId }){
        const post = await Nietzsche.findByPostId({ postId });

        if (!post) {
            const errorMessage = "해당 포스트가 없습니다.";
            return { errorMessage };
        }
        return post
    }

    //게시글 전체 조회
    static async getPostList(){
        const posts = await Nietzsche.findAll();
        return posts;
    }

    //게시글 수정
    static async setPost({ userId, postId, toUpdate }){
        let post = await Nietzsche.findByPostId({ postId });

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
        post = await Nietzsche.update({ postId, newValues });
        return post;
    }

    //게시글 삭제
    static async deletePost({ userId, postId }){
        const post = await Nietzsche.findByPostId({ postId });
        
        if (!post) {
            const errorMessage = '해당 포스트가 없습니다.';
            return { errorMessage };
        }

        if (post.author.id !== userId) {
            const errorMessage = '자신이 작성한 게시글만 삭제할 수 있습니다.';
            return { errorMessage };
        }
        const res = await Nietzsche.delete({ postId });
        return { status: "success" };
    }

}

export { nietzscheService };