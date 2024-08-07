import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../context";
import { getRoomUserInformation } from "../services/api";
import GameButtons from "../components/GameButtons";
import Sidebar from "../components/Sidebar";
import { Toaster } from "sonner";

const RoomPage = () => {
  const { roomId } = useParams();
  const { isRoomOwner, setIsRoomOwner, setRoomCode, setRoomInfos } =
    useContext(Context);

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

  return (
    <div className="container">
      <div className="room-page">
        <Toaster richColors position="top-right" />
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
