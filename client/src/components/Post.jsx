import React, { useState } from 'react';
import { postsService } from '../services/api';

const Post = ({ post, onDeletePost, onUpdatePost }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser || false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCaption, setEditedCaption] = useState(post.caption);
  const [showOptions, setShowOptions] = useState(false);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await postsService.unlikePost(post._id);
        setLikes(likes - 1);
      } else {
        await postsService.likePost(post._id);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
      // You might want to show an error message to the user
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() && !submitting) {
      try {
        setSubmitting(true);
        const commentData = {
          text: newComment
        };
        
        const response = await postsService.addComment(post._id, commentData);
        
        // The response should include the new comment with server-generated ID
        setComments([...comments, response.comment]);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
        // You might want to show an error message to the user
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      setSubmitting(true);
      const updatedData = {
        caption: editedCaption
      };
      
      // Using the postsService consistently
      const response = await postsService.updatePost(post._id, updatedData);
      
      // Call the parent component's update handler with the correct data
      if (onUpdatePost) {
        // The server returns { message: 'Post updated successfully', post: updatedPost }
        onUpdatePost(post._id, response.post);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
      // You might want to show an error message to the user
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsService.deletePost(post._id);
        
        // Call the parent component's delete handler to remove the post from the feed
        if (onDeletePost) {
          onDeletePost(post._id);
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        // You might want to show an error message to the user
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="max-w-xl bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img 
              src={post.userAvatar || "/assets/react.svg"} 
              alt="User avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{post.username}</p>
            <p className="text-xs text-gray-500">{formatDate(post.timestamp || post.createdAt)}</p>
          </div>
        </div>
        <div className="relative">
          <button 
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-full"
            onClick={toggleOptions}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
          
          {/* Options Dropdown */}
          {showOptions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button 
                  onClick={() => {
                    setIsEditing(true);
                    setShowOptions(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Post
                </button>
                <button 
                  onClick={handleDelete}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 text-gray-800"
              value={editedCaption}
              onChange={(e) => setEditedCaption(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <button 
                className="px-3 py-1 bg-gray-200 rounded-md text-gray-700"
                onClick={() => {
                  setIsEditing(false);
                  setEditedCaption(post.caption);
                }}
              >
                Cancel
              </button>
              <button 
                className="px-3 py-1 bg-blue-500 text-white rounded-md disabled:opacity-50"
                onClick={handleUpdate}
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 mb-2">{post.caption}</p>
        )}
      </div>

      {/* Post Image */}
      <div className="w-full bg-gray-200">
        <img 
          src={post.imageUrl} 
          alt="Parking fail" 
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Post Stats */}
      <div className="px-4 py-2 flex items-center justify-between text-sm text-gray-500">
        <div>{likes} likes</div>
        <div>{comments.length} comments</div>
      </div>

      {/* Post Actions */}
      <div className="flex border-t border-b border-gray-200">
        <button 
          className={`flex-1 py-2 flex justify-center items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-100`}
          onClick={handleLike}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          Like
        </button>
        <button 
          className="flex-1 py-2 flex justify-center items-center gap-1 text-gray-500 hover:bg-gray-100"
          onClick={() => setShowComments(!showComments)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          Comment
        </button>
        <button className="flex-1 py-2 flex justify-center items-center gap-1 text-gray-500 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3"></circle>
            <circle cx="6" cy="12" r="3"></circle>
            <circle cx="18" cy="19" r="3"></circle>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
          </svg>
          Share
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="p-4">
          {/* Comment Form */}
          <form onSubmit={handleComment} className="flex gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
              <img 
                src={post.currentUserAvatar || "/assets/react.svg"} 
                alt="Current user" 
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none focus:border-blue-400"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={submitting}
            />
            <button 
              type="submit"
              className={`bg-blue-500 text-white px-3 py-1 rounded-full text-sm ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Post'}
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment._id || comment.id} className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                  <img 
                    src={comment.userAvatar || "/assets/react.svg"} 
                    alt={`${comment.username}'s avatar`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <p className="font-semibold text-sm">{comment.username}</p>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 ml-2">
                    {formatDate(comment.timestamp || comment.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;