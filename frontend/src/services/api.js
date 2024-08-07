import axios from "axios";
import {
  ROOMS_URL,
  ROOM_USER_URL,
  USER_URL,
  GAME_SESSION_URL,
  ANSWERS_URL,
} from "../constants/UrlConstants";

export async function getRoomById(id) {
  return await axios.get(ROOMS_URL + `/${id}`);
}

export async function createRoom(createRoomDto) {
  return axios.post(ROOMS_URL, createRoomDto);
}

export async function joinRoom(joinRoomRequest) {
  return axios.post(ROOMS_URL + `/join`, joinRoomRequest);
}

export async function getRoomUserInformation(roomCode, token) {
  return axios.get(ROOM_USER_URL + `/room/${roomCode}/token/${token}`);
}

export async function updateUsername(userNameUpdateRequest) {
  return axios.put(USER_URL + `/update-username`, userNameUpdateRequest);
}

export async function logout(logoutRequest) {
  return axios.put(ROOM_USER_URL + `/logout`, logoutRequest);
}

export async function startSession(startSessionRequest) {
  return axios.post(GAME_SESSION_URL + "/start", startSessionRequest);
}

export async function getResults(roomCode) {
  return axios.get(GAME_SESSION_URL + `/result/${roomCode}`);
}

export async function submitAnswers(saveAnswerRequest) {
  return axios.post(ANSWERS_URL + "/submit", saveAnswerRequest);
}

export async function getGameInformation(roomCode) {
  return axios.get(GAME_SESSION_URL + `/information/${roomCode}`);
}
