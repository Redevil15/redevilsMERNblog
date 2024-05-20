import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { createComment, getComments, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createComment)
router.get('/getComments/:postId', getComments)
router.put('/likeComment/:commentId', verifyUser, likeComment)

export default router;