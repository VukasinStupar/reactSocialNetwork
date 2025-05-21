import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLoggedUserGroups } from "../services/UserService";
import '../styles/allGroupsUserIn.css';

const AllGroupsUserIn = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetchLoggedUserGroups();
        setGroups(response.data);
      } catch (error) {
        console.error("Error loading groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleGroupClick = (groupId) => {
    navigate(`/groupChat/${groupId}`);
  };

  return (
    <div className="all-groups-wrapper">
      <h2 className="all-groups-title">All Groups You Are In</h2>

      {loading ? (
        <p className="all-groups-loading">Loading...</p>
      ) : groups.length === 0 ? (
        <p className="all-groups-empty">You are not part of any groups.</p>
      ) : (
        <ul className="all-groups-list">
          {groups.map((group, index) => (
            <li
              key={group.id}
              className={`group-item group-style-${index % 3}`}
              onClick={() => handleGroupClick(group.id)}
            >
              {group.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllGroupsUserIn;
