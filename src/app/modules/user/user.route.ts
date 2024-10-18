import express from "express";
import { UserControllers } from "../user/user.contoller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { updateUserFollwersValidationSchema, updateUserValidationSchema } from "./user.validation";

const router = express.Router();

router.get('/', /* auth(USER_ROLE.admin), */ UserControllers.getAllUsers)
// router.get('/getGroupUsersInfo', /* auth(USER_ROLE.admin), */ UserControllers.getGroupUsersInfo)

router.get("/me", auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getUser);

router.put('/:userId', UserControllers.updateSingleUser)
router.put('/add-followers',validateRequest(updateUserFollwersValidationSchema), UserControllers.addFollowers)
router.put('/delete-followers',validateRequest(updateUserFollwersValidationSchema), UserControllers.deleteFollowers)
router.put(
  "/me",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(updateUserValidationSchema),
  UserControllers.updateUser,
);


export const UsersRoutes = router;
