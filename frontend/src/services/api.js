import axios from "axios";

const BASE_URL = "http://localhost:8080";

export async function getRoomById(id) {
  return await axios.get(BASE_URL + `/rooms/${id}`);
}

export async function createRoom(createRoomDto) {
  return axios.post(BASE_URL + `/rooms`, createRoomDto);
}
