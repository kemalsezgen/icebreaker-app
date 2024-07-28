import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const WebSocketComponent = ({ roomUuid, username }) => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/topic/room`, (message) => {
        const roomInfo = JSON.parse(message.body);
        if (roomInfo.roomUuid === roomUuid) {
          setUserCount(roomInfo.userCount);
        }
      });

      stompClient.send("/app/join", {}, JSON.stringify({ username, roomUuid }));
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [roomUuid, username]);

  return (
    <div>
      <h2>Users in room: {userCount}</h2>
    </div>
  );
};

export default WebSocketComponent;
