import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/allPosts.css";
import { fetchPosts } from "../services/PostService";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetchPosts(1, 2);
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  };
 

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleString();
  };

  return (
    <div className="container">
      {loading && <p>Loading posts...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && posts.length === 0 && <p>No posts available.</p>}

      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.bunnyImage} alt="Bunny" />
          <h2>{post.username || "Unknown User"}</h2> {/* Safe access to user.name */}
          <p>{post.description}</p>
          <p>{formatDate(post.createdAt)}</p> {/* Format date safely */}
          <p className="likes">{post.likes} Likes</p>
        </div>
      ))}

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={page === 0}
          className="pagination-btn"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          style={{ marginLeft: "10px" }}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllPosts;