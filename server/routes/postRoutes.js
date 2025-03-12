import express from 'express';
import { getPosts,addPost,checkPost,deletePost,searchPosts } from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';
const router = express.Router();

router.get('/posts', authMiddleware, getPosts);
router.post('/post', authMiddleware, upload.single('media'), addPost);
router.get('/search', authMiddleware, searchPosts);
router.get('/post/:id', authMiddleware, checkPost);
router.delete('/post/:id', authMiddleware, deletePost);
export default router;