import React, { useState } from 'react';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        username: 'currentUser',
        text: newComment,
        timestamp: new Date().toISOString()
      };
      setComments([...comments, comment]);
      setNewComment('');
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

  return (
    <div className="max-w-xl bg-white rounded-lg shadow-md overflow-hidden mb-6">
      {/* Post Header */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img 
              src={post.userAvatar} 
              alt="User avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{post.username}</p>
            <p className="text-xs text-gray-500">{formatDate(post.timestamp)}</p>
          </div>
        </div>
        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-800 mb-2">{post.caption}</p>
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
            />
            <button 
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
            >
              Post
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
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
                    {formatDate(comment.timestamp)}
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
