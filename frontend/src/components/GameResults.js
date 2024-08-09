import React from "react";
import GameResultCard from "./GameResultCard";

const GameResults = ({ results }) => {
  return (
    <div className="results-container">
      {results.map((result, index) => (
        <GameResultCard result={result} index={index} key={index}/>
      ))}
    </div>
  );
};

export default GameResults;
