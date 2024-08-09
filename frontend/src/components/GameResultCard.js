import React, { useState } from "react";
import { Chart } from "primereact/chart";
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

  const [lightOptions] = useState({
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
          const percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
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
      <h3>
        Question {index + 1} - {result.question.questionText}
      </h3>
      <div className="chart">
        <Chart
          type="pie"
          data={chartData}
          options={lightOptions}
          style={{ width: "300px", height: "300px" }} // Sabit boyut verdik
        />
      </div>
    </div>
  );
};

export default GameResultCard;
