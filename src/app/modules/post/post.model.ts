import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";


const postSchema = new Schema<TPost>({
    body: {
        type: String,
        required: true,
    },
    attachments: {
        type: [String],
        required: [true, 'At least one attachment is required.'],
        validate: {
            validator: function (v: string[]) {
                return v.length > 0;
            },
            message: 'At least one attachment must be provided.'
        }
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], default: [] },
    downvote: {
        type: Number,
        required: true,
    },
    upvote: {
        type: Number,
        required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
},)

export const Post = model<TPost>("Post", postSchema);
