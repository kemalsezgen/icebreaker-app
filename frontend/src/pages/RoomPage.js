import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../context";
import { getRoomUserInformation } from "../services/api";
import GameButtons from "../components/GameButtons";
import Sidebar from "../components/Sidebar";

const RoomPage = () => {
  const { roomId } = useParams();
  const {
    isRoomOwner,
    setIsRoomOwner,
    setRoomCode,
    setRoomInfos,
    message,
    setMessage,
  } = useContext(Context);

  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    setRoomCode(roomId);
  }, [roomId, setRoomCode]);

  const fetchRoomInformations = useCallback(async () => {
    try {
      const response = await getRoomUserInformation(roomId);
      setRoomInfos(response.data);
      const userCode = localStorage.getItem("token");
      setIsRoomOwner(response.data.ownerUserCode === userCode);
    } catch (err) {
      console.log("error:", err);
    }
  }, [roomId, setIsRoomOwner, setRoomInfos]);

  useEffect(() => {
    fetchRoomInformations();
  }, [roomId, fetchRoomInformations]);

  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return (
    <div className="container">
      <div className="room-page">
        <GameButtons
          isRoomOwner={isRoomOwner}
          isGameStarted={isGameStarted}
          setIsGameStarted={setIsGameStarted}
          roomId={roomId}
        />
      </div>

      <Sidebar roomId={roomId} fetchRoomInformations={fetchRoomInformations} />
    </div>
  );
};

export default RoomPage;
