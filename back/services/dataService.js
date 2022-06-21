import { Data, User } from "../db";

class dataService{
    //게시글 작성
    static async addPost({ userId, title, content, filePath }){
        const author = await User.findById({ userId });
        const newPost = { author, title, content, filePath };
        const creatednewPost = await Data.create({ newPost });
        creatednewPost.errorMessage = null;

        return creatednewPost;
    };

    //게시글 상세 조회
    static async getPostInfo({ postId }){
        const post = await Data.findByPostId({ postId });

        if (!post) {
            const errorMessage = "해당 포스트가 없습니다.";
            return { errorMessage };
        }
        return post
    };

    //게시글 전체 조회
    static async getPostList(){
        const posts = await Data.findAll();
        return posts;
    };

    //게시글 수정
    static async setPost({ userId, postId, toUpdate }){
        let post = await Data.findByPostId({ postId });

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
        post = await Data.update({ postId, newValues });
        return post;
    };

    //게시글 삭제
    static async deletePost({ userId, postId }){
        const post = await Data.delete({ postId });
        
        if (!post) {
            const errorMessage = '해당 포스트가 없습니다.';
            return { errorMessage };
        }

        if (post.author.id !== userId) {
            const errorMessage = '자신이 작성한 게시글만 수정할 수 있습니다.';
            return { errorMessage };
        }
        
        return { status: "success" };
    };

    static async addFileInfo({ postId, filePath }) {
        const post = await Data.findByPostId({ postId });
  
        if (!article) {
          const errorMessage = "해당 게시글은 등록 내역이 없습니다. 다시 한 번 확인해 주세요.";
          return errorMessage;
        }
  
        const addPostFile = await Data.addFileById({ postId, filePath });
        addPostFile.errorMessage = null;
  
        return addPostFile;
      }
  
}

export { dataService };