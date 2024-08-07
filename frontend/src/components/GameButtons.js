import React, { useCallback, useState } from "react";
import {
  getResults,
  startSession,
  getGameInformation,
  submitAnswers,
} from "../services/api";
import QuestionsModal from "../components/QuestionsModal";
import GameResults from "./GameResults";
import { toast } from "sonner";

const GameButtons = ({
  isRoomOwner,
  isGameStarted,
  setIsGameStarted,
  roomId,
}) => {
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [sessionId, setSessionId] = useState();

  const showResults = useCallback(async () => {
    try {
      const response = await getResults(roomId);
      console.log("response:", response);
      setResults(response.data.questionDetailResults);
      setIsGameStarted(false);
    } catch (err) {
      toast.error("Username cannot be empty.");
    }
  }, [roomId, setIsGameStarted]);

  const handleStartGame = async () => {
    try {
      const response = await startSession({
        roomCode: roomId,
        questionCount: 3,
      });

      setQuestions(response.data.questionList);
      setSessionId(response.data.sessionId);
      setIsGameStarted(true);
      toast.success("Game started successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to start the game.");
    }
  };

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
      toast.error("Failed to load questions.");
    }
  };

  const closeModal = () => {
    setIsQuestionsModalOpen(false);
  };

  const saveAnswers = async (answers) => {
    try {
      await submitAnswers(answers);
      toast.success("Answers saved successfully!");
      setIsQuestionsModalOpen(false);
    } catch (err) {
      toast.error("Failed to save answers");
    }
  };

  return (
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

      <GameResults results={results} />

      <QuestionsModal
        isGameStarted={isGameStarted}
        questions={questions}
        isQuestionsModalOpen={isQuestionsModalOpen}
        closeModal={closeModal}
        submitAnswers={saveAnswers}
        sessionId={sessionId}
      />
    </div>
  );
};

export default GameButtons;
