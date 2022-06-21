import { User, Token } from "../db";
import bcrypt from "bcrypt";
import { makeToken, makeRefreshToken } from "../utils/makeToken";

class userService {
  static async addUser({ email, password, name }) {
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용 중입니다. 다른 이메일을 입력해주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword, name };

    const addnewUser = await User.addUser(newUser);

    return addnewUser;
  }

  static async setUser({ userId, toUpdate }) {
    let user = await User.findById({ userId });
    const email = toUpdate.email;

    const check = await User.findByEmail({ email });

    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (user.email != email && check) {
      const errorMessage = "이미 존재하는 이메일 입니다.";
      console.log(errorMessage);
      return { errorMessage };
    }

    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const hashedPassword = await bcrypt.hash(toUpdate.password, 10);
      const newValue = hashedPassword;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }

    if (toUpdate.image) {
      const fieldToUpdate = "image";
      const newValue = toUpdate.image;
      user = await User.update({ userId, fieldToUpdate, newValue });
    }
    console.log(toUpdate.image)
    return user;
  };

  static async deleteUser({ userId }) {
    const isDataDeleted = await User.delete({ userId });
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 사용자는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { status: "ok" };
  }

  static async getUser({ email, password }) {
    const user = await User.findByEmail({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );
    const userId = String(user._id);


    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    } else if (isPasswordCorrect) {
      const accessToken = makeToken({ userId: userId });
      const refreshToken = makeRefreshToken();
        const setRefreshToken = await Token.updateRefresh({
          _id: userId,
          refreshToken,
        });

      return {
        user,
        accessToken,
        refreshToken,
      };
    } else {
      const errorMessage = "비밀번호가 틀립니다 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
  }

  static async getUserInfo({ userId }) {
    const user = await User.findById({ userId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }
}

export { userService };
