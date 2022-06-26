import { Share, User } from '../db';

class shareService {
  static async addShare({ userId, philosopher, subject, content }) {
    const author = await User.findById({ userId });
    const newShare = { author, philosopher, subject, content };
    const createdNewShare = await Share.create({ newShare });

    return createdNewShare;
  }

  static async setPost({ userId, shareId, toUpdate }) {
    let share = await Share.findByShareId({ shareId });

    if (!share) {
      const errorMessage = '해당 포스트가 없습니다.';
      return { errorMessage };
    }
    if (share.author.id != userId) {
      const errorMessage = '자신이 작성한 게시글만 수정할 수 있습니다.';
      return { errorMessage };
    }
    if (!toUpdate.philosopher) {
      toUpdate.philosopher = share.philosopher;
    }
    if (!toUpdate.subject) {
      toUpdate.subject = share.subject;
    }
    if (!toUpdate.content) {
      toUpdate.content = share.content;
    }

    const newValues = {
      philosopher: toUpdate.philosopher,
      subject: toUpdate.subject,
      content: toUpdate.content,
    };

    share = await Share.update({ shareId, newValues });
    return share;
  }

  static async getShareInfo({ shareId, userId }) {
    const share = await Share.findByShareId({ shareId });
    const like = await Share.findLike({ shareId, userId });
    
    if (like.includes(userId)) {
      share.userLike = 'like'
    } else {
      share.userLike = '좋아요를 누르지 않았습니다.'
    } 

    if (!share) {
      const errorMessage = '해당하는 글이 없습니다.';
      return { errorMessage };
    }
    return share;
  }

  static async deleteShare({ shareId, userId }) {
    const share = await Share.findByShareId({ shareId });
    if (!share) {
      const errorMessage = '해당하는 글이 없습니다.';
      return { errorMessage };
    }
    if (share.author._id != userId) {
      const errorMessage = '자신이 공유한 글만 삭제할 수 있습니다.';

      return { errorMessage };
    }

    const res = await Share.delete({ shareId });
    return res;
  }

  static async getShares() {
    const shares = await Share.findAll();
    return shares;
  }

  static async setShareLike({ shareId, userId }) {
    const share = await Share.findByShareId({ shareId });

    if (!share) {
      const errorMessage = '해당하는 글이 없습니다.';
      return { errorMessage };
    }

    const like = await Share.findLike({ shareId, userId });
    let status, result;

    if (like.length != 0) {
      status = '$pull';
      result = -1;
    } else {
      status = '$push';
      result = 1;
    }

    const newValues = {
      [status]: {
        like: userId,
      },
      $inc: { likeCount: result },
    };

    const res = await Share.updateLike({ userId, shareId, newValues });
    return res;
  }
}

export { shareService };
