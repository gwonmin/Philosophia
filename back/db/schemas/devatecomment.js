const { Schema, model } = require('mongoose');

const DevateCommentSchema = new Schema(
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
    }
);

const DevateCommentModel = model('DevateComment', DevateCommentSchema);
module.exports = { DevateCommentModel };
