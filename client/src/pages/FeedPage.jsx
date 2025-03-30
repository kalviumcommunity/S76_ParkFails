import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { postsService } from '../services/api';
import { Link } from 'react-router-dom';

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postsService.getAllPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  const handleUpdatePost = (postId, updatedPost) => {
    setPosts(posts.map(post => 
      post._id === postId ? { ...post, ...updatedPost } : post
    ));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center">
          <div className="spinner-border text-blue-600" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">ParkFails Feed</h1>
      {posts.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No posts found. Be the first to post a parking fail!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <Post 
              key={post._id} 
              post={post} 
              onDeletePost={handleDeletePost}
              onUpdatePost={handleUpdatePost}
            />
          ))}
        </div>
      )}
      <Link
        to="/upload"
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition duration-300"
        aria-label="Upload new parking fail"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </Link>
    </div>
  );
};

export default FeedPage;