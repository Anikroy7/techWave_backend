import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";
;


const createCategoryIntoDB = async (payload: TCategory) => {
    const newCategory = await Category.create(payload);
    if (!newCategory) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create category");
    }
    return newCategory;
};
const getCategoryFromDB = async (_id: string) => {
    const category = await Category.findById(_id);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the category");
    }
    return category;
};
const updateCategoryIntoDB = async (_id: string, payload: TCategory) => {
    const category = await Category.findById(_id);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the category");
    }
    const updatedCategory = await Category.findByIdAndUpdate(_id, {
        title: payload.title
    });
    return updatedCategory;
};

const getAllCategoriesFromDB = async () => {
    const categories= await Category.find({ isDeleted: { $ne: true } }).select(
        "-createdAt -updatedAt -__v",
    );
    return categories;
};
const deleteCategoryFromDB = async (_id: string) => {
    const category = await Category.findById(_id);
    if (!category) {
        throw new AppError(httpStatus.NOT_FOUND, "Can't find the category");
    }
    const updatedCategory = await Category.findByIdAndUpdate(_id, {
        isDeleted: true
    });
    return updatedCategory;
};
export const CategoryServices = {
    createCategoryIntoDB,
    deleteCategoryFromDB,
    getAllCategoriesFromDB,
    updateCategoryIntoDB,
    getCategoryFromDB
};
