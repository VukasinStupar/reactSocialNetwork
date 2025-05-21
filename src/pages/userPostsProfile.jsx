import React, { useEffect, useState } from 'react';
import '../styles/userPostsProfile.css'; 
import { useParams } from 'react-router-dom';
import { getUserPostsProfile } from '../services/PostService';

const UserPostsProfile = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
   

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getUserPostsProfile(userId);
        setPosts(response.data); 
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  return (
    <div className="user-posts-container">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.createdAt} className="user-post-card">
            <div className="user-post-header">
              <span className="username">@{post.username}</span>
              <span className="timestamp">{new Date(post.createdAt).toLocaleString()}</span>
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
        <div className="no-posts">No posts available.</div> // Display message if no posts exist
      )}
    </div>
  );
};

export default UserPostsProfile;
