import React, { useState, useContext } from "react";
import { Context } from "../context";
import Modal from "react-modal";
import QuestionCard from "./QuestionCard";

const QuestionsModal = ({
  isQuestionsModalOpen,
  questions,
  isGameStarted,
  closeModal,
  submitAnswers,
  sessionId,
  setIsAnswersSubmitted,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { roomCode, token } = useContext(Context);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSelectAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleSaveAnswers = async () => {
    const answerList = questions.map((question) => ({
      sessionId: sessionId,
      token: token,
      questionId: question.id,
      answer: answers[question.id],
      roomCode: roomCode,
    }));

    try {
      await submitAnswers(answerList);
      setIsAnswersSubmitted(true);
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const customStyles = {
    content: {
      width: "80%",
      height: "80%",
      marginTop: "40px",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };

  return (
    <Modal
      isOpen={isQuestionsModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      {isGameStarted ? (
        <div>
          <QuestionCard
            question={questions[currentQuestionIndex]}
            selectedAnswer={answers[questions[currentQuestionIndex]?.id]}
            onSelectAnswer={handleSelectAnswer}
          />
          <div className="question-navigation">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePreviousQuestion}>Previous</button>
            )}
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion}>Next</button>
            ) : (
              <button onClick={handleSaveAnswers}>Save Answers</button>
            )}
          </div>
        </div>
      ) : (
        <p>The game has not started yet</p>
      )}
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export default QuestionsModal;
