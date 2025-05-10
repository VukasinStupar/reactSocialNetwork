import React, { useState, useEffect } from 'react';
import { fetchUsersForGroup, addUserToGroup, removeUserFromGroup } from '../services/groupService';
import UserDropdown from '../components/UserDropDown';
import '../styles/usersForGroup.css';

function UsersForGroup({ groupChatId }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(4);
  const [disableNext, setDisableNext] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserToAdd, setSelectedUserToAdd] = useState(null);

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      try {
        const result = await fetchUsersForGroup(groupChatId, page, size);
        const fetchedUsers = result.data;

        if (fetchedUsers.length === 0 && page > 0) {
          setPage(prev => prev - 1);
        } else {
          setUsers(fetchedUsers);
          setDisableNext(fetchedUsers.length < size);
        }
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    }

    if (groupChatId) {
      getUsers();
    }
  }, [groupChatId, page, size]);

  const refreshUsers = async () => {
    try {
      const result = await fetchUsersForGroup(groupChatId, page, size);
      setUsers(result.data);
      setDisableNext(result.data.length < size);
    } catch (err) {
      console.error(err);
      setError('Failed to refresh users');
    }
  };

  const handleAddUser = async () => {
    if (!selectedUserToAdd) {
      alert('Please select a user to add.');
      return;
    }

    try {
      await addUserToGroup(groupChatId, selectedUserToAdd.id);
      alert('User added successfully.');
      setSelectedUserToAdd(null);
      refreshUsers();
    } catch (error) {
      console.error(error);
      alert('Failed to add user.');
    }
  };

  const handleRemoveUser = async () => {
    if (!selectedUserId) {
      alert('Please select a user to remove.');
      return;
    }

    try {
      await removeUserFromGroup(groupChatId, selectedUserId);
      alert('User removed successfully.');
      setSelectedUserId('');
      refreshUsers();
    } catch (error) {
      console.error(error);
      alert('Failed to remove user.');
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
  };

  const handleDropdownSelect = (userId) => {
    const userToAdd = users.find(user => user.id === userId) || { id: userId };
    setSelectedUserToAdd(userToAdd);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="users-group-container">
      <h2 className="users-group-title">Users in Group</h2>

      {users.length === 0 ? (
        <div className="no-users">No users found in this group.</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th></th> {/* Nova kolona za dugme */}
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr 
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className={selectedUserId === user.id ? 'selected' : ''}
              >
                <td>{user.name} {user.surname}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="remove-cell">
                  {selectedUserId === user.id && (
                    <button 
                      className="remove-btn-inline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveUser();
                      }}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="pagination-controls">
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(page + 1)} disabled={disableNext}>
          Next
        </button>
      </div>

      <div className="user-actions">
        <div>
          <UserDropdown 
            onUserSelected={handleDropdownSelect}
            buttonText="Add User to Group"
          />
          {selectedUserToAdd && (
            <button onClick={handleAddUser} style={{ marginTop: '10px' }}>
              Add {selectedUserToAdd.username || 'Selected User'}
            </button>
          )}
        </div>
        <div>
          {selectedUserId && (
            <button 
              onClick={handleRemoveUser}
              className="remove-btn"
            >
              Remove Selected User
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersForGroup;
