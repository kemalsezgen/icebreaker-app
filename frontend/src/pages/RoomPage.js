import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../context";
import { getRoomUserInformation } from "../services/api";

const RoomPage = () => {
  const { roomId } = useParams();
  const { roomName, username } = useContext(Context);
  const [roomInfos, setRoomInfos] = useState();

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

  return (
    <div className="room-page">
      <h1>Room {roomName}</h1>
      <h2>Welcome, {username}</h2>
      {roomInfos && <h3>Users in room: {roomInfos.usernameList?.length}</h3>}
    </div>
  );
};

export default RoomPage;
