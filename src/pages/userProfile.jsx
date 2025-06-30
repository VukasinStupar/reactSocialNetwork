import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/userProfile.css';
import { getUserProfile } from '../services/UserService';
import { getUserPostsProfile } from '../services/PostService';
import {
  fetchFallow,
  fetchFallowers,
  followUser,
  unfollowUser
} from '../services/followService';

const UserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followees, setFollowees] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowees, setShowFollowees] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const res = await getUserProfile(userId);
        setUserProfile(res.data);
        setIsFollowing(res.data.isFollowing);
      } catch (err) {
        setError('Failed to load profile');
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await getUserPostsProfile(userId);
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts', err);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchProfile();
    fetchPosts();
  }, [userId]);

  const handleShowFollowers = async () => {
    try {
      const res = await fetchFallowers(userId, 0, 30);
      setFollowers(res.data);
      setShowFollowers(true);
      setShowFollowees(false);
    } catch (err) {
      console.error('Error loading followers', err);
    }
  };

  const handleShowFollowees = async () => {
    try {
      const res = await fetchFallow(userId, 0, 30);
      setFollowees(res.data);
      setShowFollowees(true);
      setShowFollowers(false);
    } catch (err) {
      console.error('Error loading followees', err);
    }
  };

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        setIsFollowing(false);
      } else {
        await followUser(userId);
        setIsFollowing(true);
      }
      // Refresh profile counts
      const res = await getUserProfile(userId);
      setUserProfile(res.data);
    } catch (err) {
      console.error('Error updating follow state', err);
    }
  };

  if (loadingProfile || loadingPosts) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-profile-container">
      <div className="user-profile">
        <h2>{userProfile.name} {userProfile.surname}'s Profile</h2>
        <div className="profile-details">
          <p><strong>Username:</strong> {userProfile.username}</p>
          <p><strong>Followers:</strong> {userProfile.numberOfFollowers}</p>
          <p><strong>Followees:</strong> {userProfile.numberOfFollowees}</p>
          <p><strong>Posts:</strong> {userProfile.numberOfPosts}</p>
        </div>

        <div className="follow-buttons">
          <button onClick={handleShowFollowers}>Show Followers</button>
          <button onClick={handleShowFollowees}>Show Followees</button>
          <button onClick={handleFollowToggle}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>

        {showFollowers && (
          <div className="follow-list">
            <h3>Followers</h3>
            {followers.length > 0 ? (
              <table className="follow-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {followers.map(user => (
                    <tr key={user.id}>
                      <td>{user.name} {user.surname}</td>
                      <td>@{user.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No followers to show.</p>
            )}
          </div>
        )}

        {showFollowees && (
          <div className="follow-list">
            <h3>Followees</h3>
            {followees.length > 0 ? (
              <table className="follow-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {followees.map(user => (
                    <tr key={user.id}>
                      <td>{user.name} {user.surname}</td>
                      <td>@{user.username}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No followees to show.</p>
            )}
          </div>
        )}
      </div>

      <div className="user-posts-container">
        {posts.length > 0 ? (
          posts.map(post => (
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
