import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

import { getRoomById } from "../services/api";

const RoomGuard = ({ children }) => {
  const { roomId } = useParams();
  const [loading, setLoading] = useState(true);
  const [roomExists, setRoomExists] = useState(false);

  useEffect(() => {
    console.log("room exist:", roomExists);
  }, [roomExists]);

  useEffect(() => {
    getRoomById(roomId)
      .then((res) => {
        setRoomExists(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error:", err);
        setRoomExists(false);
        setLoading(false);
      });
  }, [roomId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!roomExists) {
    console.log("wtf");
    return <Navigate to="/not-found" replace />;
  }

  return <>{children}</>;
};

export default RoomGuard;
