import { Schema, model } from 'mongoose';

const FreeTopicSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User', // 유저 스키마 참조
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    visited: {
      type: Number,
      required: false,
      default: 0,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'FreeTopicComment', // 댓글 스키마 참조
      },
    ],
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

const FreeTopicModel = model('FreeTopic', FreeTopicSchema);

export { FreeTopicModel };
