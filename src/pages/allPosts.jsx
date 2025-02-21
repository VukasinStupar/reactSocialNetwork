import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/allPosts.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const size = 2;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/posts/displayAllPost?page=${page}&size=${size}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setPosts(response.data);
    } catch (err) {
      setError("Error fetching posts. Please try again.");
      console.error("Error fetching posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  // Function to check and format date
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
          <h2>{post.user?.name || "Unknown User"}</h2> {/* Safe access to user.name */}
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
