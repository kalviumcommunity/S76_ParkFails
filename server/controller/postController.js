const Post = require('../model/schema');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    
    // If user is logged in, check which posts they've liked
    if (req.user) {
      posts.forEach(post => {
        post._doc.isLikedByCurrentUser = post.likedBy.includes(req.user._id);
      });
    }
    
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // If user is logged in, check if they've liked this post
    if (req.user) {
      post._doc.isLikedByCurrentUser = post.likedBy.includes(req.user._id);
    }
    
    res.json(post);
  } catch (error) {
    console.error(`Error fetching post ${req.params.id}:`, error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { username, caption, imageUrl } = req.body;
    
    // For now, we'll use the username from the request
    // Later you can get this from authentication middleware
    const userAvatar = req.body.userAvatar || '/assets/react.svg';
    
    const post = new Post({
      username,
      userAvatar,
      caption,
      imageUrl
    });
    
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    // For now, we'll use a mock user ID if authentication isn't set up
    const userId = req.user ? req.user._id : '60d0fe4f5311236168a109ca';
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if post has already been liked by this user
    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'Post already liked' });
    }
    
    // Add user to likedBy array and increment likes count
    post.likedBy.push(userId);
    post.likes = post.likedBy.length;
    
    await post.save();
    
    res.json({ likes: post.likes, message: 'Post liked successfully' });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Unlike a post
exports.unlikePost = async (req, res) => {
  try {
    // For now, we'll use a mock user ID if authentication isn't set up
    const userId = req.user ? req.user._id : '60d0fe4f5311236168a109ca';
    
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Check if post has been liked by this user
    if (!post.likedBy.includes(userId)) {
      return res.status(400).json({ message: 'Post not liked yet' });
    }
    
    // Remove user from likedBy array and decrement likes count
    post.likedBy = post.likedBy.filter(id => id.toString() !== userId.toString());
    post.likes = post.likedBy.length;
    
    await post.save();
    
    res.json({ likes: post.likes, message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Error unliking post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // For now, we'll use data from the request
    // Later you can get username from authentication middleware
    const newComment = {
      username: req.body.username || 'currentUser', // Default username if not provided
      userAvatar: req.body.userAvatar || '/assets/react.svg',
      text: req.body.text
    };
    
    post.comments.push(newComment);
    
    await post.save();
    
    // Return the newly created comment
    const createdComment = post.comments[post.comments.length - 1];
    
    res.status(201).json({ 
      message: 'Comment added successfully',
      comment: createdComment
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
