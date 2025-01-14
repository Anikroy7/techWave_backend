import { model, Schema } from "mongoose";
import { TFriend } from "./friend.interface";


const friendSchema = new Schema<TFriend>({
    requestSender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    requestReciever: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
},)

export const Friend = model<TFriend>("Friend", friendSchema);
