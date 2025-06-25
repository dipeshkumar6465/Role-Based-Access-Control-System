const express = require('express');
const { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost 
} = require('../controllers/postController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected routes
router.use(authenticate);

router.post('/', authorize(['admin', 'user']), createPost);
router.put('/:id', authorize(['admin', 'user']), updatePost);
router.delete('/:id', authorize(['admin']), deletePost);

module.exports = router;