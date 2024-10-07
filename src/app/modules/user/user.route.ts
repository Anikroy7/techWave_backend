import express from "express";
import { UserControllers } from "../user/user.contoller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { updateUserValidationSchema } from "./user.validation";

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers)

router.get("/me", auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getUser);


router.put(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUser,
);


export const UsersRoutes = router;
