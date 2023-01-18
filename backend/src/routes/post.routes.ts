import express, {Request, Response} from "express";
import {getPosts, getUserPosts, likePosts} from '../controllers/post.controller.js';
import {auth} from '../middleware/verifyToken.js';
const router = express.Router();

router.get('/getPosts', auth, getPosts);
router.get('/getUserPosts/:userId', auth, getUserPosts);
router.put('likePost/:id', auth, likePosts);
export default router;