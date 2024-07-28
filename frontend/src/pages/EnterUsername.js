import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WebSocketComponent from "../components/WebSocket";

const EnterUsername = () => {
  const { roomId } = useParams();
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    console.log("roomIddddd:", roomId);
  }, [roomId]);

  const joinRoom = () => {
    setJoined(true);
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
          <button onClick={() => joinRoom()}>Join Room</button>
        </div>
      ) : (
        <WebSocketComponent roomUuid={roomId} username={username} />
      )}
    </div>
  );
};

export default EnterUsername;
