import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { CategoryControllers } from "./category.controller";

const router = express.Router();

router.get('/', CategoryControllers.getAllCategories)
router.post('/', /* auth(USER_ROLE.admin), */ CategoryControllers.createCategory)
router.put('/:categoryId', auth(USER_ROLE.admin), CategoryControllers.updateCategory)
router.get('/:categoryId', auth(USER_ROLE.admin), CategoryControllers.getCategory)
router.delete('/:categoryId', auth(USER_ROLE.admin), CategoryControllers.deleteCategory)



export const CategoryRoutes = router;
