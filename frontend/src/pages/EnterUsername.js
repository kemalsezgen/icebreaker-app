import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { joinRoom } from "../services/api";
import RoomPage from "./RoomPage";
import { Context } from "../context";

const EnterUsername = () => {
  const { roomId } = useParams();
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const {
    setToken,
    setUsername: setGlobalUsername,
    setRoomName,
    setJoinedToRoom,
  } = useContext(Context);

  const handleJoinRoom = async () => {
    try {
      const joinRoomRequest = {
        roomCode: roomId,
        username: username,
      };
      const res = await joinRoom(joinRoomRequest);
      const { token, roomName } = res.data;
      localStorage.setItem("token", token);
      setToken(token);
      setGlobalUsername(username);
      setRoomName(roomName);
      setJoinedToRoom(true);
      setJoined(true);
    } catch (err) {
      console.error("Error joining room:", err);
    }
  };

  return (
    <div>
      {!joined ? (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
      ) : (
        <RoomPage />
      )}
    </div>
  );
};

export default EnterUsername;
