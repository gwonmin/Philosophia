const { Schema, model } = require('mongoose');

const DevateSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: '', // 유저 스키마 참조
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true
        },
        tag: {
            type: Array,
            required: false,
            default: [],
        },
        yes: [{ type: String }],
        yesCount: {
            type: Number,
            default: 0,
        },
        no: [{ type: String }],
        noCount: {
            type: Number,
            default: 0,
        },
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: '' // 댓글 스키마 참조
            }
        ],
    },
    {
        timestamps: true,
    }
)

const DevateModel = model('Devate', DevateSchema);

module.exports = { DevateModel };