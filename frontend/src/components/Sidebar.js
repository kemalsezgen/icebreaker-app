import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Context } from "../context";
import { useCollapse } from "react-collapsed";
import { IoReload } from "react-icons/io5";
import { logout, updateUsername } from "../services/api";

const Sidebar = ({ roomId, fetchRoomInformations }) => {
  const navigate = useNavigate();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const {
    roomName,
    username,
    setUsername,
    roomInfos,
    message,
    setMessage,
    token,
  } = useContext(Context);
  const [newUsername, setNewUsername] = useState("");
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    if (isExpanded) {
      fetchRoomInformations();
    }
  }, [isExpanded, fetchRoomInformations]);

  const handleUpdateUsername = async () => {
    if (newUsername.trim() === "") {
      setInputError(true);
      setMessage("Username cannot be empty.");
      return;
    }

    if (newUsername === username) {
      setInputError(true);
      setMessage("Please enter a different username.");
      return;
    }

    setInputError(false);
    try {
      await updateUsername({ token, newUsername });
      setUsername(newUsername);
      setMessage("Username updated successfully!");
      setNewUsername("");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout({ token, roomCode: roomId });
      localStorage.setItem("token", null);
      setMessage("");
      setInputError("");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReload = () => {
    fetchRoomInformations();
  };

  return (
    <div className="side-containers">
      <h1>Room {roomName}</h1>
      <div className="side-sub-container update-username-container">
        <h2>
          Welcome <span style={{ color: "green" }}>{username}</span>
        </h2>
        <button className="logout-button" onClick={handleLogout}>
          logout
        </button>
        <div>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Enter new username"
            className={inputError ? "input-error" : ""}
          />
          <button onClick={handleUpdateUsername}>Update Username</button>
        </div>
        {message && <p style={{ color: "black" }}>{message}</p>}
      </div>

      <div className="side-sub-container online-users-container">
        <div>
          <div className="online-users-buttons">
            <button {...getToggleProps()}>
              {isExpanded ? "Hide user list" : "Show user list"}
            </button>
            <button onClick={handleReload}>
              <IoReload />
            </button>
          </div>
          <section {...getCollapseProps()}>
            {roomInfos && (
              <h3>Users in room: {roomInfos.usernameList?.length}</h3>
            )}
            {roomInfos?.usernameList?.map((username, index) => {
              return <p key={index}>{username}</p>;
            })}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
