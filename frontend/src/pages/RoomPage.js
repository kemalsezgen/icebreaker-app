import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCollapse } from "react-collapsed";
import { IoReload } from "react-icons/io5";

import { Context } from "../context";
import {
  getRoomUserInformation,
  logout,
  updateUsername,
} from "../services/api";

const RoomPage = () => {
  const navigate = useNavigate();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const { roomId } = useParams();
  const { roomName, username, token, setUsername } = useContext(Context);
  const [roomInfos, setRoomInfos] = useState();
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  const fetchRoomInformations = useCallback(async () => {
    try {
      const response = await getRoomUserInformation(roomId);
      setRoomInfos(response.data);
    } catch (err) {
      console.log("error:", err);
    }
  }, [roomId]);

  useEffect(() => {
    fetchRoomInformations();
  }, [roomId, fetchRoomInformations]);

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
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleReload = () => {
    fetchRoomInformations();
  };

  return (
    <div className="container">
      <div className="room-page">
        <h1>Room {roomName}</h1>
        {roomInfos && <h3>Users in room: {roomInfos.usernameList?.length}</h3>}
      </div>
      <div className="side-containers">
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
              {roomInfos?.usernameList?.map((username, index) => {
                return <p key={index}>{username}</p>;
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
