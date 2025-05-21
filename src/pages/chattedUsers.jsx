import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchChattedUsers } from "../services/messageService"; 
import '../styles/chattedUsers.css'; 

const ChattedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchChattedUsers();
        console.log("API response:", response);
        setUsers(response.data); // Ensure the response has a 'data' property
      } catch (error) {
        console.error("Error loading chatted users:", error);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/messages/${userId}`);
  };

  return (
    <div className="all-users-wrapper">
      <h2 className="all-users-title">Users You've Chatted With</h2>

      {loading ? (
        <p className="all-users-loading">Loading...</p>
      ) : error ? (
        <p className="all-users-error">{error}</p>
      ) : users.length === 0 ? (
        <p className="all-users-empty">You haven't chatted with anyone yet.</p>
      ) : (
        <ul className="all-users-list">
          {users.map((user) => (
            <li
              key={user.id}
              className="user-item"
              onClick={() => handleUserClick(user.id)}
            >
              {user.name} {user.surname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChattedUsers;
