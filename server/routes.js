const express = require('express');
const router = express.Router();
const itemController = require('./itemController');
const postController = require('./postController');


// Middleware for authentication (implement later)
// const { protect } = require('../middleware/authMiddleware');

// Get all posts
router.get('/', postController.getAllPosts);

// Get a single post
router.get('/:id', postController.getPostById);

// Create a post
router.post('/', postController.createPost);

// Like a post
router.put('/:id/like', postController.likePost);

// Unlike a post
router.put('/:id/unlike', postController.unlikePost);

// Add comment to a post
router.post('/:id/comments', postController.addComment);

// Create (POST)
router.post('/items', 
  itemController.validateItemBody, 
  itemController.createItem
);

// Read (GET all)
router.get('/items', 
  itemController.getAllItems
);

// Read (GET one)
router.get('/items/:id', 
  itemController.validateItemId, 
  itemController.getItemById
);

// Update (PUT)
router.put('/items/:id', 
  itemController.validateItemId, 
  itemController.updateItem
);

// Delete (DELETE)
router.delete('/items/:id', 
  itemController.validateItemId, 
  itemController.deleteItem
);

module.exports = router;
