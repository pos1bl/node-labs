import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from '../controllers/UserController';
import { createPost, getPostsByUserId } from '../controllers/PostController';

const router = Router();

// User routes
router.post('/users', createUser);
router.get('/users/:id', getUserById);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Post routes
router.post('/posts', createPost);
router.get('/posts/user/:userId', getPostsByUserId);

export default router;
