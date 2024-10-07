import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { CommentControllers } from "./comment.controller";

const router = express.Router();

router.get('/', /* auth(USER_ROLE.user,USER_ROLE.admin), */ CommentControllers.getAllComments)
router.post('/', /* auth(USER_ROLE.user,USER_ROLE.admin), */ CommentControllers.createComment)
router.put('/:commentId', auth(USER_ROLE.user,USER_ROLE.admin), CommentControllers.updateComment)
router.get('/:commentId', auth(USER_ROLE.user,USER_ROLE.admin), CommentControllers.getComment)
router.delete('/:commentId', auth(USER_ROLE.user,USER_ROLE.admin), CommentControllers.deleteComment)



export const CommentRoutes = router;
