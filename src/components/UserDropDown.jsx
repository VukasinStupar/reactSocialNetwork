import React, { useState } from 'react';
import GenericDropdown from './common/GenericDropDown';
import { searchUsers } from '../services/UserService';

const UserDropdown = ({ onUserSelected }) => {



  const fetchUsers = async (searchTerm) => {
    try {
      const response = await searchUsers(searchTerm);
      return response.data; 
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  };

  return (
    <GenericDropdown
      fetchData={fetchUsers}
      displayField="username"
      valueField="id"
      onSelect={onUserSelected}
      placeholder="Select a user"
      searchPlaceholder="Search users by name or email..."
      
    />
  );
};



export default UserDropdown;