import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById } from "../services/api";

const RoomPage = () => {
  const { roomId } = useParams();
  const [roomExists, setRoomExists] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRoomExists = async () => {
      getRoomById(roomId)
        .then((res) => {
          setRoomExists(true);
        })
        .catch((error) => {
          console.error("request error:", error);
          setRoomExists(false);
          navigate("/");
        });
    };

    checkRoomExists();
  }, [roomId, navigate]);

  if (!roomExists) {
    return null;
  }

  return (
    <div className="room-page">
      <h2>Welcome to Room {roomId}</h2>
    </div>
  );
};

export default RoomPage;
