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
    default: 'https://thumbnail9.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/2020/07/14/13/7/8eae1e5f-bb55-4d4d-8d1b-2ab009b58a4b.jpg',
  },
});

const userModel = model("User", UserSchema);

export { userModel };
