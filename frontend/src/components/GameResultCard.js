import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const GameResultCard = ({ result, index }) => {
  const [chartData] = useState({
    labels: [result.question.optionA, result.question.optionB],
    datasets: [
      {
        data: [result.optionAChoosers.length, result.optionBChoosers.length],
        backgroundColor: ["#42A5F5", "#66BB6A"],
        hoverBackgroundColor: ["#64B5F6", "#81C784"],
      },
    ],
  });

  const [chartOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const choosers =
              index === 0 ? result.optionAChoosers : result.optionBChoosers;
            return ` - ${choosers.length} choosers: ${choosers.join(", ")}`;
          },
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.forEach((data) => {
            sum += data;
          });
          const percentage = ((value * 100) / sum).toFixed(2);
          return percentage > 0 ? `${percentage}%` : null;
        },
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
      },
    },
  });

  return (
    <div key={index} className="result-item">
      <h2>Question {index + 1}</h2>
      <h3>{result.question.questionText}</h3>
      <div className="chart">
        <Pie
          data={chartData}
          options={chartOptions}
          style={{
            width: "80%",
            maxWidth: "300px",
            height: "300px",
            margin: "0 auto",
          }}
        />
      </div>
    </div>
  );
};

export default GameResultCard;
