import { Share, User } from '../db';

class shareService {
    static async addShare({ userId, content}) {
        const author = await User.findById({ userId });
        const newShare = { author, content };
        const createdNewShare = await Share.create({ newShare });

        return createdNewShare;
    }

    static async getShareInfo({ shareId }) {
        const share = await Share.findByShareId({ shareId });

        if (!share) {
            const errorMessage = '해당하는 글이 없습니다.';
            return { errorMessage };
        }
        return share;
    }

    static async deleteShare({ shareId, userId }) {
        const share = await Share.findByShareId({ shareId });
        console.log(share.author._id);
        console.log(userId)
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
            $inc: { likeCount: result }
        };

        const res = await Share.updateLike({ userId, shareId, newValues });
        return res;

    }
}

export { shareService };