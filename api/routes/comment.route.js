import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { createComment, editComment, getComments, likeComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post('/create', verifyUser, createComment)
router.get('/getComments/:postId', getComments)
router.put('/likeComment/:commentId', verifyUser, likeComment)
router.put('/editComment/:commentId', verifyUser, editComment)

export default router;