import axios from "axios";

export async function getRoomById(id) {
  return await axios.get(`http://localhost:8080/rooms/${id}`);
}

export async function createRoom(createRoomDto) {
  return axios.post("http://localhost:8080/rooms", { createRoomDto });
}