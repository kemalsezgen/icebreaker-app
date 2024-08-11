import React from "react";
import Slider from "react-slick";
import GameResultCard from "./GameResultCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GameResults = ({ results }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="results-container">
      <Slider {...settings}>
        {results.map((result, index) => (
          <GameResultCard result={result} index={index} key={index} />
        ))}
      </Slider>
    </div>
  );
};

export default GameResults;
