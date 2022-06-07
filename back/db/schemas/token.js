import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    // createdAt, updatedAt 자동 생성
    timestamps: true,
  }
);

const TokenModel = model("Token", tokenSchema);

export { TokenModel };
