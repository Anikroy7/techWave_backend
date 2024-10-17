import { Schema, model, Types } from "mongoose";
import { TOrder } from "./order.interface";

// Define the schema for an Order
const orderSchema = new Schema<TOrder>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    transactionId: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    totalPrice: {
        required: true,
        type: Number
    },

}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Export the model
const Order = model<TOrder>('Order', orderSchema);

export default Order;
