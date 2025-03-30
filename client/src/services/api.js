import axios from 'axios';

// In Vite, environment variables are accessed through import.meta.env
// and must be prefixed with VITE_
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an axios instance with base URL from environment variable
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Posts API service
export const postsService = {
  // Get all posts
  getAllPosts: async () => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  
  // Get a single post by ID
  getPostById: async (id) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new post
  createPost: async (postData) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  
  // Update an existing post
  updatePost: async (postId, updateData) => {
    try {
      const response = await api.put(`/posts/${postId}`, updateData);
      return response.data; // This will return the { message, post } object from the server
    } catch (error) {
      console.error(`Error updating post ${postId}:`, error);
      throw error;
    }
  },
  
  // Delete a post
  deletePost: async (postId) => {
    try {
      const response = await api.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error);
      throw error;
    }
  },
  
  // Like a post
  likePost: async (postId) => {
    try {
      const response = await api.put(`/posts/${postId}/like`);
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },
  
  // Unlike a post
  unlikePost: async (postId) => {
    try {
      const response = await api.put(`/posts/${postId}/unlike`);
      return response.data;
    } catch (error) {
      console.error('Error unliking post:', error);
      throw error;
    }
  },
  
  // Add a comment to a post
  addComment: async (postId, commentData) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, commentData);
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }
};

export default api;

const API_URL = 'http://localhost:3000/api';

// Export the createPost function that's imported by UploadForm.jsx
export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Add update post function
export const updatePost = async (postId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating post ${postId}:`, error);
    throw error;
  }
};

// Add delete post function
export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting post ${postId}:`, error);
    throw error;
  }
};

// Add more API functions as needed
export const likePost = async (postId) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error('Error liking post:', error);
    throw error;
  }
};

export const addComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`${API_URL}/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};