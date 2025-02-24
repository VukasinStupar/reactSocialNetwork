import React, { useEffect, useState } from "react";
import { fetchUsersForUser } from '../services/messageService';
import '../styles/messages.css';

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetchUsersForUser();
                    setUsers(response.data);
            } catch (err) {
                setError("Failed to fetch user data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    if (loading) return <p>Loading user data...</p>;
    if (error) return <p>{error}</p>;
    if (users.length === 0) return <p>No users found.</p>;

    return (
        <div className="messages-container">
            <h2>Messages</h2>
            {users.map((user) => (
                <div key={user.id} className="user-card">
                    <p><strong>Name:</strong> {user.name} {user.surname}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Address:</strong> {user.adress}</p>
                    <p><strong>Last Login:</strong> {user.lastLogin}</p>
                    <p><strong>Number of Posts:</strong> {user.numberOfPosts}</p>
                    <p><strong>Followers:</strong> {user.numberOfFollowers}</p>
                    <p><strong>Following:</strong> {user.numberOfFollowees}</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;