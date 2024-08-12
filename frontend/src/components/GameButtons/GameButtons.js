import React, { useCallback, useState } from "react";
import {
  getResults,
  startSession,
  getGameInformation,
  submitAnswers,
} from "../../services/api";
import "./GameButtons.css";
import QuestionsModal from "../Modals/QuestionsModal";
import GameResults from "../GameResults";
import { toast } from "sonner";
import GameSettingsModal from "../Modals/GameSettingsModal/GameSettingsModal";

const GameButtons = ({
  isRoomOwner,
  isGameStarted,
  setIsGameStarted,
  roomId,
  isAnswersSubmitted,
  setIsAnswersSubmitted,
}) => {
  const [results, setResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [sessionId, setSessionId] = useState();

  const showResults = useCallback(async () => {
    try {
      const response = await getResults(roomId);
      setResults(response.data.questionDetailResults);
    } catch (err) {
      toast.error("Failed to fetch results.");
    }
  }, [roomId]);

  const handleStartGame = async (questionCount) => {
    try {
      const response = await startSession({
        roomCode: roomId,
        questionCount,
      });

      setQuestions(response.data.questionList);
      setSessionId(response.data.sessionId);
      setIsGameStarted(true);
      setIsAnswersSubmitted(false);
      setResults([]);
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
      toast.error("Game is not active.");
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
      setIsAnswersSubmitted(true);
    } catch (err) {
      toast.error("Failed to save answers");
    }
  };

  return (
    <div className="game-controls">
      <div className="game-controls-buttons">
        {isRoomOwner && (
          <>
            <button onClick={() => setIsSettingsModalOpen(true)}>
              Start New Game
            </button>
          </>
        )}

        <button disabled={!isGameStarted} onClick={showResults}>
          Show Results
        </button>

        <button onClick={openModal} disabled={isAnswersSubmitted}>
          Show Questions
        </button>
      </div>
      {results.length > 0 ? (
        <GameResults key={JSON.stringify(results)} results={results} />
      ) : (
        ""
      )}

      <QuestionsModal
        isGameStarted={isGameStarted}
        questions={questions}
        isQuestionsModalOpen={isQuestionsModalOpen}
        closeModal={closeModal}
        submitAnswers={saveAnswers}
        sessionId={sessionId}
        setIsAnswersSubmitted={setIsAnswersSubmitted}
      />

      <GameSettingsModal
        isOpen={isSettingsModalOpen}
        onRequestClose={() => setIsSettingsModalOpen(false)}
        handleStartGame={handleStartGame}
      />
    </div>
  );
};

export default GameButtons;
