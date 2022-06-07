import { TokenModel } from "../schemas/token";

class Token {
  static async findToken(userId) {
    const userToken = await TokenModel.findOne({ _id: userId });
    return userToken;
  }

  static async updateRefresh({ _id, refreshToken }) {
    const update = await TokenModel.updateOne(
      { _id },
      { _id, refreshToken },
      { upsert: true }
    );
    return update;
  }
}

export { Token };
