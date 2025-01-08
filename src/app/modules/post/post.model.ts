import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";


const postSchema = new Schema<TPost>({
    body: {
        type: String,
        required: true,
    },
    attachments: {
        type: [String],
        required: false

    },
    category: { type: String, required: true },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }], default: [] },
    downvote: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    upvote: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isPaid: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true,
},)

export const Post = model<TPost>("Post", postSchema);
