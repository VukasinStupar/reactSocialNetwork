import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import "../styles/allPosts.css";
import { fetchPosts, toggleLike } from "../services/PostService";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, [page]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await fetchPosts(page, size);
      setPosts(response.data);
      setError(null);
    } catch (error) {
      console.error("Failed to load posts:", error);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId, e) => {
    e.stopPropagation(); // zaustavi propagaciju da se ne otvori detalj posta
    try {
      await toggleLike(postId);
      await loadPosts();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/postDetails/${postId}`);
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
        <div
          className="post"
          key={post.id}
          onClick={() => handlePostClick(post.id)}
          style={{ cursor: "pointer" }}
        >
          <img src={post.bunnyImage} alt="Bunny" />
          <h2>{post.username || "Unknown User"}</h2>
          <p>{post.description}</p>
          <p>{formatDate(post.createdAt)}</p>
          <p className="likes">{post.likes} Likes</p>

          {/* Dugme za Like/Dislike sa zaustavljanjem propagacije */}
          <button
            onClick={(e) => handleLike(post.id, e)}
            className="like-button"
          >
            👍 Like / Dislike
          </button>
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
