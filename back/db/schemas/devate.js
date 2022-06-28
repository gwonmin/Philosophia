import { Schema, model } from 'mongoose';

const DevateSchema = new Schema(
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
    tag: {
      type: Array,
      required: false,
      default: [],
    },
    yes: [{ type: String }],
    no: [{ type: String }],

    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DevateComment', // 댓글 스키마 참조
      },
    ],
    userStance: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  },
  {
    versionKey: false,
  }
);

const DevateModel = model('Devate', DevateSchema);

export { DevateModel };
