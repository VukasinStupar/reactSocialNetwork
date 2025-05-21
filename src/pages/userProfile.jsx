import React, { useEffect, useState } from 'react';
import { getUserPostsProfile } from '../services/PostService';
import { useParams } from 'react-router-dom';
import '../styles/userProfile.css';  // The same CSS file as the first component
import { getUserProfile } from '../services/UserService';

const UserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(userId);
        setUserProfile(response.data);
      } catch (err) {
        setError('Error fetching user profile');
      } finally {
        setLoadingProfile(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  // Fetch user posts data
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await getUserPostsProfile(userId);
        setPosts(response.data);
      } catch (err) {
        console.error('Failed to fetch user posts:', err);
      } finally {
        setLoadingPosts(false);
      }
    };

    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  // Loading state for both profile and posts
  if (loadingProfile || loadingPosts) return <div className="loading">Loading...</div>;

  // Error handling
  if (error) return <div className="error">{error}</div>;

  // No profile data available
  if (!userProfile) return <div className="error">No profile data available</div>;

  return (
    <div className="user-profile-container">
      {/* User Profile */}
      <div className="user-profile">
        <h2>{userProfile.name} {userProfile.surname}'s Profile</h2>
        <div className="profile-details">
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Followers:</strong> {userProfile.numberOfFollowers}</p>
          <p><strong>Followees:</strong> {userProfile.numberOfFollowees}</p>
          <p><strong>Posts:</strong> {userProfile.numberOfPosts}</p>
        </div>
      </div>

      {/* User Posts */}
      <div className="user-posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.createdAt} className="user-post-card">
              <div className="user-post-header">
                <span className="username">@{post.username}</span>
                <span className="message-time">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="description">{post.description}</div>

              {post.bunnyImage && (
                <div className="image-container">
                  <img src={post.bunnyImage} alt="Post" />
                </div>
              )}
              <div className="likes">👍 Likes: {post.likes}</div>
            </div>
          ))
        ) : (
          <div className="no-posts">No posts available.</div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
