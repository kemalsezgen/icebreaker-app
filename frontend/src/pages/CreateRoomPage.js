import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createRoom } from "../services/api";
import { CLIENT_URL } from "../constants/UrlConstants";

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState();
  const [username, setUsername] = useState();
  const [emptyClicked, setEmptyClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmptyClicked(false);
  }, [roomName]);

  const handleCreateRoom = async () => {
    if (
      roomName !== null &&
      roomName !== undefined &&
      username !== null &&
      username !== undefined
    ) {
      const createRoomDto = {
        name: roomName,
        createdBy: username,
      };
      createRoom(createRoomDto)
        .then((response) => {
          const code = response.data.roomCode;
          const inviteLink = `${CLIENT_URL} + /room/${code}`;
          alert(
            `Room created! Invite your friends using this link: ${inviteLink}`
          );
          const { token } = response.data;
          localStorage.setItem("token", token);
          navigate(`/room/${code}`);
        })
        .catch((error) => {
          console.error("There was an error creating the room!", error);
        });
    } else {
      setEmptyClicked(true);
    }
  };

  return (
    <div className="create-room-page">
      <div className="create-room-page-sub">
        <h2>Create a Room</h2>
        <input
          className={
            emptyClicked ? `username-textbox-empty` : `username-textbox`
          }
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={
            emptyClicked ? `create-room-textbox-empty` : `create-room-textbox`
          }
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
    </div>
  );
};

export default CreateRoomPage;
