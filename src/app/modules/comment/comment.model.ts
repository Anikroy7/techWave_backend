import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>({
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

export const Comment= model<TComment>("Comment", commentSchema)