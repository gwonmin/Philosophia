import { Schema, model } from 'mongoose';

const FreeTopicCommentSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User', // 유저 스키마 참조
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

const FreeTopicCommentModel = model('FreeTopicComment', FreeTopicCommentSchema);

export { FreeTopicCommentModel };
