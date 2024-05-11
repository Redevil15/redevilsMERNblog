import express from 'express';
import { create, deletepost, getposts, updatepost } from '../controllers/post.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyUser, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyUser, deletepost)
router.put('/updatepost/:postId/:userId', verifyUser, updatepost)

export default router;