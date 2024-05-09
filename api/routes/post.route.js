import express from 'express';
import { create } from '../controllers/post.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyUser, create)

export default router;