import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/UserService'; // Adjust the path if necessary
import "../styles/tables.css";

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(2); // You can adjust the page size

    useEffect(() => {
        async function getUsers() {
            try {
                const result = await fetchUsers(page, size);
                setUsers(result.data); 
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        }
        getUsers();
    }, [page, size]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Users List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name} {user.surname}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                    Previous
                </button>
                <button onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default AllUsers;