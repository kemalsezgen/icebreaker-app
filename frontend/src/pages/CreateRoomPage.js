import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createRoom } from "../services/api";
import { CLIENT_URL } from "../constants/UrlConstants";
import { Toaster, toast } from "sonner";

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState();
  const [username, setUsername] = useState();
  const [emptyClicked, setEmptyClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmptyClicked(false);
  }, [roomName]);

  const handleCreateRoom = async () => {
    if (roomName && username) {
      const createRoomDto = {
        name: roomName,
        createdBy: username,
      };

      try {
        const response = await createRoom(createRoomDto);
        const code = response.data.roomCode;
        const inviteLink = `${CLIENT_URL}/room/${code}`;
        const { token } = response.data;
        localStorage.setItem("token", token);

        const copyLink = () => {
          navigator.clipboard.writeText(inviteLink).then(() => {
            toast.success("Link copied to clipboard!");
            navigate(`/room/${code}`);
          });
        };

        toast.success(
          <div>
            <h3>Room created!</h3>
            <h3>Invite your friends using this link:</h3>
            <p>You can copy link any time you want from url</p>
            <h1>{inviteLink}</h1>
            <button onClick={copyLink}>Copy link and join room</button>
          </div>
        );

        setTimeout(() => {
          navigate(`/room/${code}`);
        }, 10000);
      } catch (error) {
        toast.error("There was an error creating the room!");
        console.error("There was an error creating the room!", error);
      }
    } else {
      setEmptyClicked(true);
    }
  };

  return (
    <div className="create-room-page">
      <Toaster richColors position="top-center" />
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
