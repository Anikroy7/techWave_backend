import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
    isDeleted: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    }

})

export const Category = model("Category", categorySchema)