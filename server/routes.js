const express = require('express');
const router = express.Router();

// Import controllers
const itemController = require('./controller/itemController');
const postController = require('./controller/postController');

// Item routes
router.post('/items', itemController.validateItemBody, itemController.createItem);
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.validateItemId, itemController.getItemById);
router.put('/items/:id', itemController.validateItemId, itemController.updateItem);
router.delete('/items/:id', itemController.validateItemId, itemController.deleteItem);

// Post routes
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);
router.post('/posts', postController.validatePostBody, postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);
router.put('/posts/:id/like', postController.likePost);
router.put('/posts/:id/unlike', postController.unlikePost);
router.post('/posts/:id/comments', postController.validateCommentBody, postController.addComment);

module.exports = router;