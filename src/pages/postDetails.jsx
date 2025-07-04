import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPostById, toggleLike, addComment } from '../services/PostService';
import { checkIfFollowing } from '../services/followService';  // <-- import
import '../styles/postDetails.css';

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newComment, setNewComment] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const [isFollowing, setIsFollowing] = useState(false); // new state

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const response = await fetchPostById(postId);
        setPost(response.data);

        // Check if logged user follows the post owner
        if (response.data.userId) {
          const followResp = await checkIfFollowing(response.data.userId);
          setIsFollowing(followResp.data.following);
        } else {
          setIsFollowing(false);
        }
      } catch (err) {
        setError('Failed to load post or follow status');
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [postId]);

  const handleLike = async () => {
    if (!isFollowing) return; // prevent action if not following

    try {
      await toggleLike(postId);
      const response = await fetchPostById(postId);
      setPost(response.data);
    } catch {
      alert('Failed to like post');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isFollowing) return; // prevent if not following

    try {
      setCommentLoading(true);
      setCommentError(null);

      await addComment(postId, newComment);

      const response = await fetchPostById(postId);
      setPost(response.data);

      setNewComment('');
    } catch (err) {
      setCommentError('Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <div className="post-details">
      <h2>Post by {post.username}</h2>
      <p>{post.description}</p>
      <img src={post.bunnyImage} alt="Post visual" className="post-image" />

      <div className="likes-section">
        <span>Likes: {post.likes}</span>
        <button onClick={handleLike} disabled={!isFollowing}>
          Like
        </button>
        {!isFollowing && (
          <small style={{ color: 'red', marginLeft: 8 }}>
            You must follow {post.username} to like or comment.
          </small>
        )}
      </div>

      <p className="created-at">Created At: {post.createdAt}</p>

      <div className="comments-section">
        <h3>Comments:</h3>
        {post.comments && post.comments.length > 0 ? (
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>
                <b>{comment.username}:</b> {comment.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}

        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={commentLoading || !isFollowing}
            className="comment-input"
          />
          <button
            type="submit"
            disabled={commentLoading || !newComment.trim() || !isFollowing}
          >
            {commentLoading ? 'Posting...' : 'Post'}
          </button>
        </form>

        {commentError && <p className="error-message">{commentError}</p>}
      </div>
    </div>
  );
}

export default PostDetails;
