import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

import { getRoomById } from "../services/api";

const RoomGuard = ({ children }) => {
  const { roomId } = useParams();
  const [loading, setLoading] = useState(true);
  const [roomExists, setRoomExists] = useState(false);

  useEffect(() => {
    const checkRoomExists = async () => {
      getRoomById(roomId)
        .then((res) => {
          setRoomExists(true);
        })
        .catch((err) => {
          console.log("Room does not exist:", roomId);
          setRoomExists(false);
        });
      setLoading(false);
    };
    checkRoomExists();
  }, [roomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!roomExists) {
    return <Navigate to="/not-found" replace />;
  }

  return <>{children}</>;
};

export default RoomGuard;
