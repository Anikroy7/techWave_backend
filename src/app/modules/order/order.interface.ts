import { Types } from "mongoose";


export type TOrder = {
    user: Types.ObjectId;
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    transactionId: {
        type: String,
        required: true
    },
    totalPrice: number,
    startDate: string,
    endDate: string;
}