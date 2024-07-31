import axios from "axios";

const BASE_URL = "http://localhost:8080";
const ROOMS_URL = BASE_URL + "/rooms";
const ROOM_USER_URL = BASE_URL + "/room-user";
const USER_URL = BASE_URL + "/user";

export async function getRoomById(id) {
  return await axios.get(ROOMS_URL + `/${id}`);
}

export async function createRoom(createRoomDto) {
  return axios.post(ROOMS_URL, createRoomDto);
}

export async function joinRoom(joinRoomRequest) {
  return axios.post(ROOMS_URL + `/join`, joinRoomRequest);
}

export async function getRoomUserInformation(roomCode) {
  return axios.get(ROOM_USER_URL + `/${roomCode}`);
}

export async function updateUsername(userNameUpdateRequest) {
  return axios.put(USER_URL + `/update-username`, userNameUpdateRequest);
}
