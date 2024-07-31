import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../context";
import { getRoomUserInformation, updateUsername } from "../services/api";

const RoomPage = () => {
  const { roomId } = useParams();
  const { roomName, username, token, setUsername } = useContext(Context);
  const [roomInfos, setRoomInfos] = useState();
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    const fetchRoomInformations = async () => {
      try {
        const response = await getRoomUserInformation(roomId);
        setRoomInfos(response.data);
      } catch (err) {
        console.log("error:", err);
      }
    };
    fetchRoomInformations();
  }, [roomId]);

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
      const response = await updateUsername({ token, newUsername });
      setUsername(newUsername);
      setMessage("Username updated successfully!");
      setNewUsername("");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
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

  return (
    <div className="container">
      <div className="room-page">
        <h1>Room {roomName}</h1>
        {roomInfos && <h3>Users in room: {roomInfos.usernameList?.length}</h3>}
      </div>
      <div className="update-username-container">
        <h2>
          Welcome <span style={{ color: "green" }}>{username}</span>
        </h2>
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
    </div>
  );
};

export default RoomPage;
