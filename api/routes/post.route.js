import express from 'express';
import { create, getposts } from '../controllers/post.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyUser, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyUser, deletepost)

export default router;