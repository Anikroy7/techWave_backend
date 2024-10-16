import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { PostControllers } from "./post.controller";

const router = express.Router();

router.get('/', /* auth(USER_ROLE.user, USER_ROLE.admin), */ PostControllers.getAllPosts)
router.get('/my-posts', /* auth(USER_ROLE.user, USER_ROLE.admin), */ PostControllers.getMyPosts)
router.post('/', /* auth(USER_ROLE.user), */  PostControllers.createPost)
router.put('/:postId',/*  auth(USER_ROLE.user, USER_ROLE.admin), */ PostControllers.updatePost)
router.get('/:postId', auth(USER_ROLE.user, USER_ROLE.admin), PostControllers.getPost)
router.delete('/:postId', /* auth(USER_ROLE.user, USER_ROLE.admin), */ PostControllers.deletePost)



export const PostRoutes = router;
