import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCollapse } from "react-collapsed";
import { IoReload } from "react-icons/io5";
import QuestionsModal from "../components/QuestionsModal";

import { Context } from "../context";
import {
  getRoomUserInformation,
  logout,
  updateUsername,
  startSession,
  getResults,
  submitAnswers,
  getGameInformation,
} from "../services/api";

const RoomPage = () => {
  const navigate = useNavigate();
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const { roomId } = useParams();
  const {
    roomName,
    username,
    token,
    setUsername,
    isRoomOwner,
    setIsRoomOwner,
    setRoomCode,
  } = useContext(Context);
  const [roomInfos, setRoomInfos] = useState();
  const [newUsername, setNewUsername] = useState("");
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [sessionId, setSessionId] = useState();

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
  }, [roomId, setIsRoomOwner]);

  useEffect(() => {
    fetchRoomInformations();
  }, [roomId, fetchRoomInformations]);

  useEffect(() => {
    if (isExpanded) {
      fetchRoomInformations();
    }
  }, [isExpanded, fetchRoomInformations]);

  const handleUpdateUsername = async () => {
    if (newUsername.trim() === "") {
      setInputError(true);
      setMessage("Username cannot be empty.");
      return;
    }

    if (newUsername === username) {
      setInputError(true);
      setMessage("Please enter a different username.");
      return;
    }

    setInputError(false);
    try {
      await updateUsername({ token, newUsername });
      setUsername(newUsername);
      setMessage("Username updated successfully!");
      setNewUsername("");
    } catch (err) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout({ token, roomCode: roomId });
      localStorage.setItem("token", null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (message !== "") {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleReload = () => {
    fetchRoomInformations();
  };

  const handleStartGame = async () => {
    try {
      const response = await startSession({
        roomCode: roomId,
        questionCount: 3,
      });

      setQuestions(response.data.questionList);
      setSessionId(response.data.sessionId);
      setIsGameStarted(true);
      setMessage("Game started successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to start the game.");
    }
  };

  const showResults = useCallback(async () => {
    try {
      const response = await getResults(roomId);
      console.log("response:", response);
      setResults(response.data.questionDetailResults);
      setIsGameStarted(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to get results");
    }
  }, [roomId]);

  const openModal = async () => {
    try {
      const response = await getGameInformation(roomId);
      const gameInformation = response.data;
      setQuestions(gameInformation.questionList);
      setSessionId(gameInformation.sessionId);
      if (gameInformation.questionList.length > 0) {
        setIsGameStarted(true);
      }
      setIsQuestionsModalOpen(true);
    } catch (err) {
      console.error("Failed to get questions", err);
      setMessage("Failed to load questions.");
    }
  };

  const closeModal = () => {
    setIsQuestionsModalOpen(false);
  };

  const saveAnswers = async (answers) => {
    try {
      await submitAnswers(answers);
      setMessage("Answers saved successfully!");
      setIsQuestionsModalOpen(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to save answers");
    }
  };

  return (
    <div className="container">
      <div className="room-page">
        <div className="game-controls">
          {isRoomOwner && (
            <>
              <button
                className="start-game-button"
                disabled={isGameStarted}
                onClick={handleStartGame}
              >
                Start Game
              </button>

              <button
                className="start-game-button"
                disabled={!isGameStarted}
                onClick={showResults}
              >
                Show Results
              </button>
            </>
          )}
          <button onClick={openModal}>Show Questions</button>
        </div>

        <QuestionsModal
          isGameStarted={isGameStarted}
          questions={questions}
          isQuestionsModalOpen={isQuestionsModalOpen}
          closeModal={closeModal}
          submitAnswers={saveAnswers}
          sessionId={sessionId}
        />

        <div className="results-container">
          {results.map((result, index) => (
            <div key={index} className="result-item">
              <h3>
                Question {index + 1} - {result.questionText}
              </h3>
              <p>
                Option A choosers ({result.optionAChoosers.length}) - {" "}
                {result.optionAChoosers.join(", ")}
              </p>
              <p>
                Option B choosers ({result.optionBChoosers.length}) - {" "}
                {result.optionBChoosers.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="side-containers">
        <h1>Room {roomName}</h1>
        {roomInfos && <h3>Users in room: {roomInfos.usernameList?.length}</h3>}
        <div className="side-sub-container update-username-container">
          <h2>
            Welcome <span style={{ color: "green" }}>{username}</span>
          </h2>
          <button className="logout-button" onClick={handleLogout}>
            logout
          </button>
          <div>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              className={inputError ? "input-error" : ""}
            />
            <button onClick={handleUpdateUsername}>Update Username</button>
          </div>
          {message && <p style={{ color: "black" }}>{message}</p>}
        </div>

        <div className="side-sub-container online-users-container">
          <div>
            <div className="online-users-buttons">
              <button {...getToggleProps()}>
                {isExpanded ? "Hide user list" : "Show user list"}
              </button>
              <button onClick={handleReload}>
                <IoReload />
              </button>
            </div>
            <section {...getCollapseProps()}>
              {roomInfos && (
                <h3>Users in room: {roomInfos.usernameList?.length}</h3>
              )}
              {roomInfos?.usernameList?.map((username, index) => {
                return <p key={index}>{username}</p>;
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
