import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRoomById, joinRoom } from "../services/api";
import RoomPage from "./RoomPage";
import { Context } from "../context";

const EnterUsername = () => {
  const { roomId } = useParams();
  const [username, setUsername] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [joined, setJoined] = useState(false);
  const [emptyClicked, setEmptyClicked] = useState(false);

  const {
    setToken,
    setUsername: setGlobalUsername,
    roomName,
    setRoomName,
    setJoinedToRoom,
  } = useContext(Context);

  useEffect(() => {
    const getRoomInformations = async () => {
      const res = await getRoomById(roomId);
      const { name, createdBy } = res.data;
      setRoomName(name);
      setCreatedBy(createdBy);
    };

    try {
      getRoomInformations();
    } catch (err) {
      console.error(err);
    }
  }, [roomId, createdBy, setRoomName]);

  useEffect(() => {
    setEmptyClicked(false);
  }, [username]);

  const handleJoinRoom = async () => {
    if (username !== "") {
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
    } else {
      setEmptyClicked(true);
    }
  };

  return (
    <div>
      {!joined ? (
        <div className="join-room-page">
          <div className="join-room-page-sub">
            <h2>
              {`Enter `}{" "}
              <span style={{ color: "purple", fontWeight: "300" }}>
                {createdBy}
              </span>{" "}
              {`'s room: `}{" "}
              <span style={{ color: "purple", fontWeight: "300" }}>
                {roomName}
              </span>
            </h2>
            <input
              className={
                emptyClicked ? `username-textbox-empty` : `username-textbox`
              }
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <button onClick={handleJoinRoom}>Join Room</button>
          </div>
        </div>
      ) : (
        <RoomPage />
      )}
    </div>
  );
};

export default EnterUsername;
