import { userModel } from "../schemas/user";

class User {
  static async addUser({ newUser }) {
    const addNewUser = await userModel.create({ newUser });
    return addNewUser;
  }

  static async findByEmail({ email }) {
    const user = await userModel.findOne({ email });
    return user;
  }

  static async findById({ userId }) {
    const user = await userModel.findOne({ _id: userId });
    return user;
  }

  static async delete({ userId }) {
    const deleteResult = await userModel.findByIdAndDelete({ _id: userId });
    return deleteResult;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await userModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
}

export { User };
