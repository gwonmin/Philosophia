import { FreeTopic, User } from '../db';

class freetopicService {
  // 게시글 작성
  static async addPost({ userId, title, content }) {
    const author = await User.findById({ userId });
    const newPost = { author, title, content };
    const createdNewPost = await FreeTopic.create({ newPost });
    createdNewPost.errorMessage = null;

    return createdNewPost;
  }

  // 게시글 1개 조회
  static async getPostInfo({ postId }) {
    const post = await FreeTopic.findByPostId({ postId });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다.';
      return { errorMessage };
    }

    return post;
  }

  // 게시글 수정
  static async setPost({ userId, postId, toUpdate }) {
    let post = await FreeTopic.findByPostId({ postId });

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

    const newValues = {
      title: toUpdate.title,
      content: toUpdate.content,
      tag: toUpdate.tag,
    };

    post = await FreeTopic.update({ postId, newValues });
    return post;
  }

  // 게시글 삭제
  static async deletePost({ userId, postId }) {
    const post = await FreeTopic.findByPostId({ postId });

    if (!post) {
      const errorMessage = '해당 포스트가 없습니다.';
      return { errorMessage };
    }
    if (post.author.id != userId) {
      const errorMessage = '자신이 작성한 게시글만 삭제할 수 있습니다.';
      return { errorMessage };
    }

    const res = await FreeTopic.delete({ postId });
    return res;
  }

  // 사용자가 쓴 게시물 조회
  static async getPostInfoByUserId({ userId }){
    const posts = await FreeTopic.findByUserId({ userId });
    return posts;
  }

  // 전체 게시글 조회
  static async getPosts() {
    const posts = await FreeTopic.findAll();
    return posts;
  }
}

export { freetopicService };
