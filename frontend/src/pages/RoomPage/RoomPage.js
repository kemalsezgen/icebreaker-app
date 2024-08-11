import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./RoomPage.css";
import { Context } from "../../context";
import { getRoomUserInformation } from "../../services/api";
import GameButtons from "../../components/GameButtons/GameButtons";
import Sidebar from "../../components/Sidebar";
import { Toaster } from "sonner";

const RoomPage = () => {
  const { roomId } = useParams();
  const { isRoomOwner, setIsRoomOwner, setRoomCode, setRoomInfos } =
    useContext(Context);

  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isAnswersSubmitted, setIsAnswersSubmitted] = useState(false);

  useEffect(() => {
    setRoomCode(roomId);
  }, [roomId, setRoomCode]);

  const fetchRoomInformations = useCallback(async () => {
    try {
      const userCode = localStorage.getItem("token");
      const response = await getRoomUserInformation(roomId, userCode);
      setRoomInfos(response.data);
      setIsRoomOwner(response.data.ownerUserCode === userCode);
      setIsGameStarted(response.data.isGameStarted);
      setIsAnswersSubmitted(response.data.isUserSubmittedAnswers);
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
          isAnswersSubmitted={isAnswersSubmitted}
          setIsAnswersSubmitted={setIsAnswersSubmitted}
        />
      </div>

      <Sidebar fetchRoomInformations={fetchRoomInformations} />
    </div>
  );
};

export default RoomPage;
