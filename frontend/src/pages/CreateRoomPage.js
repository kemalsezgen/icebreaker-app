import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createRoom } from "../services/api";

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState("");
  const [emptyClicked, setEmptyClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("roomName:", roomName);
    setEmptyClicked(false);
  }, [roomName]);

  const handleCreateRoom = async () => {
    if (roomName !== "") {
      const createRoomDto = {
        roomName,
      };
      createRoom(createRoomDto)
        .then((response) => {
          console.log("response", response);
          const uuid = response.data.uuid;
          const inviteLink = `http://localhost:3000/room/${uuid}`;
          alert(
            `Room created! Invite your friends using this link: ${inviteLink}`
          );
          navigate(`/room/${uuid}`);
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
      <h2>Create a Room</h2>
      <div className="create-room-page-sub">
        <input
          className={emptyClicked ? `create-room-textbox` : ``}
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
