import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: 'http://file3.instiz.net/data/cached_img/upload/2020/02/28/22/1cb5549e434dd52044010ef9104bc05b.jpg',
  },
});

const userModel = model("User", UserSchema);

export { userModel };
